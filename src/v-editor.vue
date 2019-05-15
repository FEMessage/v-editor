<template>
  <div class="v-editor">
    <div class="loading-mask"
         v-if="showLoading">
      <div class="loading-content">
        <slot name="loading">
          <p>文件上传中...</p>
        </slot>
      </div>
    </div>
    <div ref="editor"
         style="text-align:left"
         @paste="paste">
    </div>
    <upload-to-ali multiple
                   v-show="false"
                   ref="uploadToAli"
                   v-bind="uploadOptions"
                   @loading="handleLoading"
                   @loaded="handleUploadFileSuccess"></upload-to-ali>

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
     * upload-to-ali的参数:
     * 文档参看upload-to-ali;
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
     * editor默认配置
     * 文档查看 https://github.com/wangfupeng1988/wangEditor;
     */
    editorOptions: {
      type: Object,
      default: () => {
        return defaultEditorOptions
      }
    },
    /**
     * 编辑器的高度
     * 默认高度为400px
     */
    height: {
      type: Number,
      default: 400
    },
    /**
     * 编辑器是否可编辑:
     * false 可以编辑
     * true 不可以编辑
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
      document.querySelector('.w-e-toolbar').style['pointer-events'] = val
        ? 'none'
        : ''
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
    document.querySelector('.w-e-toolbar').style['pointer-events'] = this
      .disabled
      ? 'none'
      : ''
    editor.$textElem.attr('contenteditable', !this.disabled)

    //设置编辑器的高度
    document.querySelector('.w-e-text-container').style.height = `${
      this.height
    }px`

    //监听上传图标的点击事件
    document
      .getElementById(editor.imgMenuId)
      .addEventListener('click', this.handleUpload)

    //保存实例，用于后续处理
    this.editor = editor
  },
  methods: {
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
        //外部监听upload-error，增加错误上传的处理
        this.$emit('upload-error')
      }
      //外部监听upload-loading，增加显示loading ui 逻辑
      this.showLoading = false
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
