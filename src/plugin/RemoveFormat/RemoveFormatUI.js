import RemoveFormatUI from '@ckeditor/ckeditor5-remove-format/src/removeformatui'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
// 只有图标和原本不一样
import removeButtonIcon from '@ckeditor/ckeditor5-core/theme/icons/eraser.svg'

const REMOVE_FORMAT = 'removeFormat'

export default class extends RemoveFormatUI {
  init() {
    const editor = this.editor

    editor.ui.componentFactory.add(REMOVE_FORMAT, locale => {
      const command = editor.commands.get(REMOVE_FORMAT)
      const view = new ButtonView(locale)

      view.set({
        label: '清除格式',
        icon: removeButtonIcon,
        tooltip: true
      })

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute the command.
      this.listenTo(view, 'execute', () => {
        editor.execute(REMOVE_FORMAT)
        editor.editing.view.focus()
      })

      return view
    })
  }
}
