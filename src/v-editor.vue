<template>
  <div class="v-editor">
    <div ref="editor"></div>
    <upload-to-ali
      v-show="false"
      ref="uploadToAli"
      value=""
      v-bind="uploadOptions"
    />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import UploadToAli from '@femessage/upload-to-ali'
import defaultEditorOptions from './defaultEditorOptions'
import {debounce} from 'lodash-es'
import ImageUploader from './plugin/imageUploader'

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
      default: () => ({})
    },
    /**
     * 编辑的内容，返回一段HTML，支持v-model
     */
    value: {
      type: String,
      default: () => ({})
    },
    /**
     * editor配置
     *
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
      enableUpdateValue: true,
      showLoading: false,
      editor: null
    }
  },
  watch: {
    disabled(value) {
      this.editor.isReadOnly = value
    }
  },
  mounted() {
    this.initEditor()
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
      this.editor = null
    }
  },
  methods: {
    async initEditor() {
      const editorOptions = {
        extraPlugins: [ImageUploader(this.$refs.uploadToAli)],
        ...defaultEditorOptions,
        initialData: this.value,

        autosave: {
          save: debounce(editor => {
            this.$emit('autosave', editor.getData())
          }, 10000)
        },
        ...this.editorOptions
      }
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
      editor.model.document.on('change:data', debounce(emitValue, 300))
      editor.editing.view.document.on('focus', e => {
        this.$emit('focus', e)
      })
      editor.editing.view.document.on('blur', e => {
        this.$emit('blur', e)
      })
    }
  }
}
</script>

<style lang="less">
.v-editor {
  position: relative;

  .full-screen {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10000;

    .ck-editor__main {
      & > .ck-content {
        height: calc(100vh - 41px);
        overflow: auto;
      }
    }
  }
}
</style>
