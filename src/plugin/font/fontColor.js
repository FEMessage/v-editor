import generateUIPlugin from '../generateUIPlugin'
import FontColorEditing from '@ckeditor/ckeditor5-font/src/fontcolor/fontcolorediting'

import ColorUI from './ColorUI'
import {FONT_COLOR} from '@ckeditor/ckeditor5-font/src/utils'
import fontColorIcon from '@ckeditor/ckeditor5-font/theme/icons/font-color.svg'

/**
 * The font color UI plugin. It introduces the `'fontColor'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
class FontColorUI extends ColorUI {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    const t = editor.locale.t

    super(editor, {
      commandName: FONT_COLOR,
      componentName: FONT_COLOR,
      icon: fontColorIcon,
      dropdownLabel: t('Font Color')
    })
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'FontColorUI'
  }
}

export default generateUIPlugin('FontColor', [FontColorEditing, FontColorUI])
