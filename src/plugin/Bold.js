import generateUIPlugin from './generateUIPlugin'
import BoldEditing from '@ckeditor/ckeditor5-basic-styles/src/bold/boldediting'
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/bold/boldui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import boldIcon from '../assets/bold.svg'

const BOLD = 'bold'

/**
 * The bold UI feature. It introduces the Bold button.
 *
 * @extends module:core/plugin~Plugin
 */
class BoldUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    // Add bold button to feature components.
    editor.ui.componentFactory.add(BOLD, locale => {
      const command = editor.commands.get(BOLD)
      const view = new ButtonView(locale)

      view.set({
        label: '加粗',
        icon: boldIcon,
        keystroke: 'CTRL+B',
        tooltip: true,
        isToggleable: true
      })

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute command.
      this.listenTo(view, 'execute', () => editor.execute(BOLD))

      return view
    })
  }
}

export default generateUIPlugin('Bold', [BoldEditing, BoldUI])
