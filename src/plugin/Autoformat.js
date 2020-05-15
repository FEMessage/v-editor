import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import BlockAutoformatEditing from '@ckeditor/ckeditor5-autoformat/src/blockautoformatediting'

export default class TheAutoformat extends Autoformat {
  _addListAutoformats() {
    const commands = this.editor.commands

    if (commands.get('bulletedList')) {
      // eslint-disable-next-line no-new
      new BlockAutoformatEditing(
        this.editor,
        /^[*-]\s/,
        this._composeListener('bulletedList')
      )
    }

    if (commands.get('numberedList')) {
      // eslint-disable-next-line no-new
      new BlockAutoformatEditing(
        this.editor,
        /^1\.\s/,
        this._composeListener('numberedList')
      )
    }
  }

  _addHeadingAutoformats() {
    const command = this.editor.commands.get('heading')

    if (command) {
      command.modelElements
        .filter(name => name.match(/^heading[1-6]$/))
        .forEach(commandValue => {
          const level = commandValue[7]
          const pattern = new RegExp(`^(#{${level}})\\s`)

          // eslint-disable-next-line no-new
          new BlockAutoformatEditing(this.editor, pattern, () => {
            if (!command.isEnabled) {
              return false
            }

            this.editor.execute('heading', {value: commandValue})
          })
        })
    }
  }

  _composeListener(command) {
    return () => {
      const isComposing = this.editor.editing.view.document.isComposing
      if (isComposing) return false
      return this.editor.execute(command)
    }
  }
}
