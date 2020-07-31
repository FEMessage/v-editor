import generateUIPlugin from './generateUIPlugin'
import HorizontalLineEditing from '@ckeditor/ckeditor5-horizontal-line/src/horizontallineediting'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import horizontalLineIcon from '../assets/horizontalline.svg'

class HorizontalLineUI extends Plugin {
  init() {
    const editor = this.editor
    // Add the `horizontalLine` button to feature components.
    editor.ui.componentFactory.add('horizontalLine', locale => {
      const command = editor.commands.get('horizontalLine')
      const view = new ButtonView(locale)

      view.set({
        label: '分割线',
        icon: horizontalLineIcon,
        tooltip: true
      })

      view.bind('isEnabled').to(command, 'isEnabled')

      // Execute the command.
      this.listenTo(view, 'execute', () => editor.execute('horizontalLine'))

      return view
    })
  }
}

export default generateUIPlugin('HorizontalLine', [
  HorizontalLineEditing,
  HorizontalLineUI
])
