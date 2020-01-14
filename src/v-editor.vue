<template>
  <div class="v-editor">
    <!-- <div class="loading-mask" v-if="showLoading">
    <div class="loading-content">-->
    <!-- @slot 自定义上传文本 -->
    <!-- <slot name="loading">
          <p>文件上传中...</p>
        </slot>
      </div>
    </div>-->
    <div ref="editor" @paste="paste"></div>
    <!-- <upload-to-ali
      v-model="imgs"
      multiple
      v-show="false"
      ref="uploadToAli"
      v-bind="uploadOptions"
      @loading="handleLoading"
      @loaded="handleUploadFileSuccess"
      @fail="handleUploadFileFail"
    />-->
  </div>
</template>

<script>
import ClassicEditor from './CKEditor'
// import UploadToAli from '@femessage/upload-to-ali'
import defaultEditorOptions from './defaultEditorOptions'
// import mixinFocusHack from './mixins/focusHack'
import {inputDebounce} from './utils'

const HTML_PATTERN = /^<[a-z\s]+class="text-box"/i

// 对齐wangEditor的样式
const editorValue = val =>
  val && HTML_PATTERN.test(val) ? val : `<div class="text-box">${val}<br></div>`

export default {
  name: 'VEditor',
  // mixins: [mixinFocusHack],
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
      default: () => ({})
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
      imgs: [],
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
    value(val) {
      if (this.enableUpdateValue) {
        this.editor && this.editor.txt.html(val)
      }
    }
  },
  mounted() {
    this.initEditor()
  },
  beforeDestroy() {
    this.editor = null
  },
  methods: {
    async initEditor() {
      const editorOptions = Object.assign(
        {},
        defaultEditorOptions,
        {
          initialData: this.value
        },
        this.editorOptions
      )
      try {
        const editor = await ClassicEditor.create(
          this.$refs.editor,
          editorOptions
        )
        editor.isReadOnly = this.disabled

        this.editorEvents(editor)
        this.editor = editor
      } catch (error) {
        console.error(errro)
      }
    },
    editorEvents(e) {
      const editor = e || this.editor
      // 监听内容变化
      const emitValue = () => this.$emit('input', editor.getData())
      editor.model.document.on('change:data', inputDebounce(emitValue))
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
      this.enableUpdateValue = false
    },
    handleUploadFileFail() {
      this.showLoading = false
    },
    paste(e) {
      const {clipboardData} = e
      const {files, types} = clipboardData
      const isCopyFromWeb = types.some(type => type === 'text/html')
      if (!files.length || isCopyFromWeb) return
      this.$refs.uploadToAli.paste(e)
    }
  }
}
</script>

<style lang="stylus">
.v-editor {
  position: relative;
}
</style>
