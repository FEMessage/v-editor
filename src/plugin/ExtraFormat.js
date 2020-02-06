import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import BlockAutoformatEditing from '@ckeditor/ckeditor5-autoformat/src/blockautoformatediting'
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element'

export default class ExtraFormat extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'ExtraFormat'
  }

  afterInit() {
    this._addListAutoformat()
    this._urlImageAutoformat()
  }

  /**
   * 任务列表支持快捷键: [](Space)
   */
  _addListAutoformat() {
    const commands = this.editor.commands

    if (commands.get('todoList')) {
      new BlockAutoformatEditing(this.editor, /^\[\]\s$/, 'todoList')
    }
  }

  /**
   * URL 图片
   */
  _urlImageAutoformat() {
    new BlockAutoformatEditing(
      this.editor,
      /^!\[(\S*)\]\((.*?)\)\s$/,
      writer => {
        const [, imageAlt, imageUrl] = writer.match

        if (!imageUrl) {
          return false
        }

        const doc = this.editor.model.document

        const imageElement = new ModelElement('image', {
          src: imageUrl,
          alt: imageAlt
        })

        this.editor.model.insertContent(imageElement, doc.selection)
      }
    )
  }
}
