import generateUIPlugin from './generateUIPlugin'
import BlockQuoteEditing from '@ckeditor/ckeditor5-block-quote/src/blockquoteediting'
import BlockQuoteUI from '@ckeditor/ckeditor5-block-quote/src/blockquoteui'

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import quoteIcon from '../assets/quotes.svg'

class BlockQuoteUICustom extends BlockQuoteUI {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    editor.ui.componentFactory.add('blockQuote', locale => {
      const command = editor.commands.get('blockQuote')
      const buttonView = new ButtonView(locale)

      buttonView.set({
        label: '引用',
        icon: quoteIcon,
        tooltip: true,
        isToggleable: true
      })

      // Bind button model to command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute command.
      this.listenTo(buttonView, 'execute', () => editor.execute('blockQuote'))

      return buttonView
    })
  }
}

export default generateUIPlugin('BlockQuote', [
  BlockQuoteEditing,
  BlockQuoteUICustom
])
