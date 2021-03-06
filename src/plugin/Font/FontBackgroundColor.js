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
    super(editor, {
      commandName: FONT_BACKGROUND_COLOR,
      componentName: FONT_BACKGROUND_COLOR,
      icon: fontBackgroundColorIcon,
      dropdownLabel: '背景颜色'
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
