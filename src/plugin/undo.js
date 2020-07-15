import generateUIPlugin from './generateUIPlugin'
import UndoEditing from '@ckeditor/ckeditor5-undo/src/undoediting'
import UndoUI from '@ckeditor/ckeditor5-undo/src/undoui'

import undoIcon from '../assets/undo.svg'
import redoIcon from '../assets/redo.svg'

/**
 * The undo UI feature. It introduces the `'undo'` and `'redo'` buttons to the editor.
 *
 * @extends module:core/plugin~Plugin
 */
class UndoUICustom extends UndoUI {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    const locale = editor.locale

    const localizedUndoIcon =
      locale.uiLanguageDirection == 'ltr' ? undoIcon : redoIcon
    const localizedRedoIcon =
      locale.uiLanguageDirection == 'ltr' ? redoIcon : undoIcon

    this._addButton('undo', '撤销', 'CTRL+Z', localizedUndoIcon)
    this._addButton('redo', '重做', 'CTRL+Y', localizedRedoIcon)
  }
}
export default generateUIPlugin('Undo', [UndoEditing, UndoUICustom])
