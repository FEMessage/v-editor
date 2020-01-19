import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import BlockAutoformatEditing from '@ckeditor/ckeditor5-autoformat/src/blockautoformatediting'

export default class ExtraFormat extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'ExtraFormat'
  }

  afterInit() {
    this._addListAutoformats()
  }

  _addListAutoformats() {
    const commands = this.editor.commands

    if (commands.get('todoList')) {
      new BlockAutoformatEditing(this.editor, /^\[\]\s$/, 'todoList')
    }
  }
}
