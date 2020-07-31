import generateUIPlugin from './generateUIPlugin'
import UnderlineEditing from '@ckeditor/ckeditor5-basic-styles/src/underline/underlineediting'

/**
 * @module basic-styles/underline/underlineui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import underlineIcon from '../assets/underline.svg'

const UNDERLINE = 'underline'

/**
 * The underline UI feature. It introduces the Underline button.
 *
 * @extends module:core/plugin~Plugin
 */
class UnderlineUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor

    // Add bold button to feature components.
    editor.ui.componentFactory.add(UNDERLINE, locale => {
      const command = editor.commands.get(UNDERLINE)
      const view = new ButtonView(locale)

      view.set({
        label: '下划线',
        icon: underlineIcon,
        keystroke: 'CTRL+U',
        tooltip: true,
        isToggleable: true
      })

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute command.
      this.listenTo(view, 'execute', () => editor.execute(UNDERLINE))

      return view
    })
  }
}

export default generateUIPlugin('Underline', [UnderlineEditing, UnderlineUI])
