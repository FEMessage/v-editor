<template>
  <div class="v-editor">
    <div class="loading-mask" v-if="showLoading">
      <div class="loading-content">
        <!-- @slot 自定义上传文本 -->
        <slot name="loading">
          <p>文件上传中...</p>
        </slot>
      </div>
    </div>
    <div ref="editor" style="text-align:left" @paste="paste"></div>
    <upload-to-ali
      multiple
      v-show="false"
      ref="uploadToAli"
      v-bind="uploadOptions"
      @loading="handleLoading"
      @loaded="handleUploadFileSuccess"
    />
  </div>
</template>

<script>
import E from 'wangeditor'
import UploadToAli from '@femessage/upload-to-ali'
import defaultEditorOptions from './defaultEditorOptions'

const HTML_PATTERN = /^<[a-z].*>$/i

// 对齐wangEditor的样式
const editorValue = val =>
  val && HTML_PATTERN.test(val) ? val : `<div class="text-box">${val}<br></div>`

export default {
  name: 'VEditor',
  components: {
    UploadToAli
  },
  props: {
    /**
     * upload-to-ali的参数，参考[upload-to-ali文档](https://femessage.github.io/upload-to-ali)
     */
    uploadOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 编辑的内容，返回一段HTML，支持v-model
     */
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    /**
     * editor配置，参考[wangEditor文档](https://github.com/wangfupeng1988/wangEditor)；
     * [默认配置](https://github.com/FEMessage/v-editor/blob/dev/src/defaultEditorOptions.js)
     */
    editorOptions: {
      type: Object,
      default: () => {
        return defaultEditorOptions
      }
    },
    /**
     * 编辑器的高度，单位px
     */
    height: {
      type: Number,
      default: 400
    },
    /**
     * 编辑器是否可编辑
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      enableUpdateValue: true,
      showLoading: false
    }
  },
  watch: {
    disabled(val, oldVal) {
      this.$refs.editor.querySelector('.w-e-toolbar').style[
        'pointer-events'
      ] = val ? 'none' : ''
      this.editor.$textElem.attr('contenteditable', !val)
    },
    value(val, oldVal) {
      //更新编辑器内容会导致光标偏移, 故只在blur之后更新
      if (this.enableUpdateValue) {
        this.editor && this.editor.$textElem.html(editorValue(val))
      }
    }
  },
  mounted() {
    //初始化editor
    const editor = new E(this.$refs.editor)
    // 允许自定义上传
    editor.customConfig.qiniu = true
    // 自定义菜单配置
    editor.customConfig.menus =
      this.editorOptions.menus || defaultEditorOptions.menus
    //debug模式下，有 JS 错误会以throw Error方式提示出来。默认值为false，即不会抛出异常。
    editor.customConfig.debug = this.editorOptions.debug

    //配置编辑区域的 z-index
    editor.customConfig.zIndex = 100

    // 自定义 onchange 触发的延迟时间，默认为 200 ms
    editor.customConfig.onchangeTimeout =
      this.editorOptions.onchangeTimeout || defaultEditorOptions.onchangeTimeout // 单位 ms

    /**
     * onchange里要处理空值校验的问题:
     * 目标：v-editor视觉上内容为空(无文本无图片)时，value为''
     * 默认情况下，v-editor视觉上内容为空时，value不为空，可能包括以下情况：
     * 1. 空内容的斜体、加粗符号
     * 2. 空内容的quote块
     * 3. 空内容的table
     */
    editor.customConfig.onchange = html => {
      // 不使用editor.txt.text()的原因是，该方法返回的是去掉标签的html内容，则空格是&nbsp，无法被trim
      const noText = !editor.$textElem[0].textContent
        .trim()
        // 处理斜体和加粗符号('zero-width space')
        .replace(/\u200b/g, '')

      const noImg = !html.includes('img')
      this.$emit('input', noText && noImg ? '' : html)
    }

    editor.customConfig.onfocus = html => {
      // 选中焦点时不处理watch value
      this.enableUpdateValue = false
    }
    editor.customConfig.onblur = html => {
      // 失去焦点时watch value
      this.enableUpdateValue = true
    }

    editor.create()

    //设置默认值
    editor.txt.html(editorValue(this.value))
    //是否禁用编辑器
    editor.$textElem.attr('contenteditable', !this.disabled)

    const toolbar = this.$refs.editor.querySelector('.w-e-toolbar')
    toolbar.style['pointer-events'] = this.disabled ? 'none' : ''
    // 设置toolbar的颜色
    const borderColor = '#CAD1E8'
    const borderRadius = '4px'
    toolbar.style.backgroundColor = '#F4F6FA'
    toolbar.style.borderColor = borderColor
    toolbar.style.borderTopLeftRadius = borderRadius
    toolbar.style.borderTopRightRadius = borderRadius
    const opacityIdle = 0.6
    const opacityFocus = 1
    toolbar.querySelectorAll('.w-e-menu').forEach(item => {
      const i = item.querySelector('i')
      i.style.color = '#2D303B'
      i.style.opacity = opacityIdle
      item.addEventListener(
        'mouseenter',
        () => (i.style.opacity = opacityFocus)
      )
      item.addEventListener('mouseleave', () => (i.style.opacity = opacityIdle))
    })

    //设置编辑器的高度
    const textContainer = this.$refs.editor.querySelector('.w-e-text-container')
    textContainer.style.borderColor = borderColor
    textContainer.style.height = `${this.height}px`
    textContainer.style.borderBottomLeftRadius = borderRadius
    textContainer.style.borderBottomRightRadius = borderRadius

    //监听上传图标的点击事件
    document
      .getElementById(editor.imgMenuId)
      .addEventListener('click', this.handleUpload)

    //保存实例，用于后续处理
    this.editor = editor
  },
  methods: {
    /**
     * 返回内部的wangEditor对象
     * @public
     */
    getEditor() {
      //暴露当前编辑器，可以在外部调用编辑器的功能
      return this.editor
    },
    handleUpload() {
      //如果禁用则不进行上传操作
      if (this.disabled) return

      this.$refs.uploadToAli.selectFiles()
    },
    handleLoading() {
      //外部监听upload-loading，增加显示loading ui 逻辑
      this.showLoading = true
      this.$emit('upload-loading', true)
    },
    handleUploadFileSuccess(urls) {
      // 将文件上传后的URL地址插入到编辑器文本中
      if (!!urls) {
        // 插入图片到editor
        urls.forEach(item => {
          this.editor.cmd.do(
            'insertHtml',
            '<img src="' + item + '" style="max-width:100%;"/>'
          )
        })
      } else {
        /**
         * 可监听并增加上传错误时的提醒交互
         */
        this.$emit('upload-error')
      }
      //外部监听upload-loading，增加显示loading ui 逻辑
      this.showLoading = false
      /**
       * 可监听并增加上传 loading 交互
       * @property {boolean} loading - 是否加载中
       */
      this.$emit('upload-loading', false)
    },
    paste(e) {
      if (!e.clipboardData.files.length) return
      this.$refs.uploadToAli.paste(e)
    }
  }
}
</script>

<style lang="stylus">
.v-editor {
  position: relative;
  .text-box {
    margin: 10px 0;
    line-height: 1.5;
  }

  .disabled-mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    cursor: not-allowed;
  }

  .loading-mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;

    .loading-content {
      position: absolute;
      text-align: center;
      width: 100%;
      top: 50%;
      margin-top: -21px;
    }
  }
}
</style>
