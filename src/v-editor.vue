<template>
  <div class="v-editor">
    <ckeditor
      :editor="ClassicEditor"
      :value="value"
      :disabled="disabled"
      :config="editorConfig"
      @input="onInput"
      @ready="onReady"
      v-on="$listeners"
    />
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
import debounce from 'lodash-es/debounce'
import merge from 'lodash-es/merge'
import ImageUploader from './plugin/ImageUploader'
import CKEditor from '@ckeditor/ckeditor5-vue'

export default {
  name: 'VEditor',
  components: {
    UploadToAli,
    ckeditor: CKEditor.component
  },
  props: {
    /**
     * 编辑区占位符
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * 编辑区高度（不包括 toolbar），支持数字类型（默认单位 px）和 css 长度字符串
     */
    height: {
      type: [Number, String],
      default: undefined
    },
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
     * 编辑器是否可编辑
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      ClassicEditor
    }
  },
  computed: {
    editorConfig() {
      // $refs 在 mounted 阶段才挂载，这里不能直接传实例
      const uploadImg = this.uploadFile
      return merge(
        defaultEditorOptions,
        {
          placeholder: this.placeholder,
          extraPlugins: [ImageUploader(uploadImg)],
          autosave: {
            save: debounce(editor => {
              /**
               * 建议自动保存事件，当 8 秒内未触发 input 事件时触发；
               * 另外，v-editor 还支持 focus、blur 等 ckeditor-vue 事件；
               * 见[文档](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html#component-events)
               *
               * @property {string} data - 当前内容
               */
              this.$emit('autosave', editor.getData())
            }, 8000)
          }
        },
        this.editorOptions
      )
    }
  },
  watch: {
    height: 'setHeight'
  },
  methods: {
    setHeight() {
      if (!this.height || !this.editor) return
      let {height} = this
      if (!isNaN(+height)) height += 'px'
      const {element} = this.editor.ui.view
      const content = element.querySelector('.ck-editor__main')
      content.style.height = height
    },
    onInput(content) {
      this.$emit('input', content)
    },
    onReady(editor) {
      this.editor = editor
      editor.ui.view.element.classList.add('markdown-body')
      this.setHeight()
    },
    uploadFile(file) {
      const request = this.$refs.uploadToAli.uploadRequest(file)
      this.$emit('upload-start')
      request
        .then(res => {
          this.$emit('upload-end', true, res)
        })
        .catch(e => {
          this.$emit('upload-end', false, e)
        })
      return request
    }
  }
}
</script>

<style src="github-markdown-css/github-markdown.css"></style>
<style lang="less">
.v-editor {
  position: relative;

  .ck .ck-heading-dropdown {
    max-width: 80px;
  }

  .ck-content .image {
    margin: 1em 0;
  }

  .ck-editor__main {
    & > .ck-content {
      height: 100%;
    }
  }

  .ck.ck-editor__editable > .ck-placeholder::before {
    color: #c0c4cc;
  }

  ol,
  ul {
    padding-left: 1.5em;
  }

  // 不要影响 ul 的列表项
  ol ol {
    list-style-type: lower-alpha;

    & ol {
      list-style-type: lower-roman;
    }
  }

  .full-screen {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10000;

    .ck-editor__main {
      height: calc(100vh - 41px) !important;
    }
  }
}
</style>
