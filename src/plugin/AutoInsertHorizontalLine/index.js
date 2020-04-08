import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import BlockAutoformatEditing from '@ckeditor/ckeditor5-autoformat/src/blockautoformatediting.js'

export default class extends Plugin {
  static get pluginName() {
    return 'AutoInsertHorizontalLine'
  }
  afterInit() {
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
}
