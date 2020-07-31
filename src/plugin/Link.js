import generateUIPlugin from './generateUIPlugin'
import LinkEditing from '@ckeditor/ckeditor5-link/src/linkediting'
import LinkUI from '@ckeditor/ckeditor5-link/src/linkui'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import linkIcon from '../assets/link.svg'
const linkKeystroke = 'Ctrl+K'
class LinkUICustom extends LinkUI {
  _createToolbarLinkButton() {
    const editor = this.editor
    const linkCommand = editor.commands.get('link')
    // Handle the `Ctrl+K` keystroke and show the panel.
    editor.keystrokes.set(linkKeystroke, (keyEvtData, cancel) => {
      // Prevent focusing the search bar in FF and opening new tab in Edge. #153, #154.
      cancel()

      if (linkCommand.isEnabled) {
        this._showUI(true)
      }
    })

    editor.ui.componentFactory.add('link', locale => {
      const button = new ButtonView(locale)

      button.isEnabled = true
      button.label = '超链接'
      button.icon = linkIcon
      button.keystroke = linkKeystroke
      button.tooltip = true
      button.isToggleable = true

      // Bind button to the command.
      button.bind('isEnabled').to(linkCommand, 'isEnabled')
      button.bind('isOn').to(linkCommand, 'value', value => !!value)

      // Show the panel on button click.
      this.listenTo(button, 'execute', () => this._showUI(true))

      return button
    })
  }
}

export default generateUIPlugin('Link', [LinkEditing, LinkUICustom])
