import generateUIPlugin from './generateUIPlugin'
import ItalicEditing from '@ckeditor/ckeditor5-basic-styles/src/italic/italicediting'
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/italic/italicui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import italicIcon from '../assets/italic.svg'

const ITALIC = 'italic'

/**
 * The italic UI feature. It introduces the Italic button.
 *
 * @extends module:core/plugin~Plugin
 */
class ItalicUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor

    // Add bold button to feature components.
    editor.ui.componentFactory.add(ITALIC, locale => {
      const command = editor.commands.get(ITALIC)
      const view = new ButtonView(locale)

      view.set({
        label: '斜体',
        icon: italicIcon,
        keystroke: 'CTRL+I',
        tooltip: true,
        isToggleable: true
      })

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute command.
      this.listenTo(view, 'execute', () => editor.execute(ITALIC))

      return view
    })
  }
}

export default generateUIPlugin('Italic', [ItalicEditing, ItalicUI])
