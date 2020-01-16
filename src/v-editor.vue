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
    <upload-to-ali
      v-model="imgs"
      multiple
      v-show="false"
      ref="uploadToAli"
      v-bind="uploadOptions"
      @loading="handleLoading"
      @loaded="handleUploadFileSuccess"
      @fail="handleUploadFileFail"
    />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import UploadToAli from '@femessage/upload-to-ali'
import defaultEditorOptions from './defaultEditorOptions'
import {inputDebounce} from './utils'

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
      showLoading: false,
      editor: null
    }
  },
  mounted() {
    this.initEditor()
  },
  beforeDestroy() {
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    async initEditor() {
      const editorOptions = Object.assign(
        {},
        defaultEditorOptions,
        {
          initialData: this.value
          // uploadOptions: this.uploadOptions
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
        console.error(error)
      }
    },
    editorEvents(e) {
      const editor = e || this.editor
      // 监听内容变化
      const emitValue = () => this.$emit('input', editor.getData())
      editor.model.document.on('change:data', inputDebounce(emitValue))
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

<style lang="less">
.v-editor {
  position: relative;
}
</style>
