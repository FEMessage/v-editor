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
    this._addHorizontalLineAutoFormat()
  }

  /**
   * 任务列表支持快捷键: [](Space)
   */
  _addListAutoformat() {
    const commands = this.editor.commands

    if (commands.get('todoList')) {
      new BlockAutoformatEditing(
        this.editor,
        /^\[\]\s/,
        this._composeListener('todoList')
      )
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

  /**
   * 快捷插入分割线
   */
  _addHorizontalLineAutoFormat() {
    const {editor} = this
    const cmd = 'horizontalLine'
    if (!editor.commands.get(cmd)) return
    const pat = /^---\s$/
    new BlockAutoformatEditing(editor, pat, () => {
      const node = editor.model.document.selection.getFirstPosition().parent
      editor.model.enqueueChange(writer => {
        writer.remove(node)
        // 先 remove 再插入分割线，这样光标才会停在分割线下一行
        editor.execute(cmd)
      })
    })
  }

  _composeListener(command) {
    return () => {
      const isComposing = this.editor.editing.view.document.isComposing
      if (isComposing) return false
      return this.editor.execute(command)
    }
  }
}
