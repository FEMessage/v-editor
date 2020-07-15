import generateUIPlugin from '../generateUIPlugin'
import ColorUI from './ColorUI'

import {FONT_BACKGROUND_COLOR} from '@ckeditor/ckeditor5-font/src/utils'
import fontBackgroundColorIcon from '@ckeditor/ckeditor5-font/theme/icons/font-background.svg'

import FontBackgroundColorEditing from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor/fontbackgroundcolorediting'
class FontBackgroundColorUI extends ColorUI {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    const t = editor.locale.t

    super(editor, {
      commandName: FONT_BACKGROUND_COLOR,
      componentName: FONT_BACKGROUND_COLOR,
      icon: fontBackgroundColorIcon,
      dropdownLabel: t('Font Background Color')
    })
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'FontBackgroundColorUI'
  }
}

export default generateUIPlugin('FontBackgroundColor', [
  FontBackgroundColorEditing,
  FontBackgroundColorUI
])
