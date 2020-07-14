import generateUIPlugin from '../generateUIPlugin'
import FontColorEditing from '@ckeditor/ckeditor5-font/src/fontcolor/fontcolorediting'

/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/fontcolor/fontcolorui
 */

import ColorUI from '@ckeditor/ckeditor5-font/src/ui/colorui'
import {FONT_COLOR} from '@ckeditor/ckeditor5-font/src/utils'
import fontColorIcon from '../../assets/fontcolor.svg'

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
