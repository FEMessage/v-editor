import ColorUI from '@ckeditor/ckeditor5-font/src/ui/colorui'
import {addColorTableToDropdown} from './utils'
import {
  normalizeColorOptions,
  getLocalizedColorOptions
} from '@ckeditor/ckeditor5-ui/src/colorgrid/utils'
import {createDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import DropdownButtonView from '../DropdownButtonView'

export default class ColorUICustom extends ColorUI {
  init() {
    const editor = this.editor
    const command = editor.commands.get(this.commandName)
    const colorsConfig = normalizeColorOptions(
      editor.config.get(this.componentName).colors
    )
    const localizedColors = getLocalizedColorOptions(editor, colorsConfig)
    const documentColorsCount = editor.config.get(
      `${this.componentName}.documentColors`
    )

    // Register the UI component.
    editor.ui.componentFactory.add(this.componentName, locale => {
      const dropdownView = createDropdown(locale, DropdownButtonView)
      this.colorTableView = addColorTableToDropdown({
        dropdownView,
        colors: localizedColors.map(option => ({
          label: option.label,
          color: option.model,
          options: {
            hasBorder: option.hasBorder
          }
        })),
        columns: this.columns,
        removeButtonLabel: '移除颜色',
        documentColorsLabel:
          documentColorsCount !== 0 ? '文档中的颜色' : undefined,
        documentColorsCount:
          documentColorsCount === undefined ? this.columns : documentColorsCount
      })

      this.colorTableView.bind('selectedColor').to(command, 'value')

      dropdownView.buttonView.set({
        label: this.dropdownLabel,
        icon: this.icon,
        tooltip: true
      })

      dropdownView.extendTemplate({
        attributes: {
          class: 'ck-color-ui-dropdown'
        }
      })

      dropdownView.bind('isEnabled').to(command)

      dropdownView.on('execute', (evt, data) => {
        editor.execute(this.commandName, data)
        editor.editing.view.focus()
      })

      dropdownView.on('change:isOpen', (evt, name, isVisible) => {
        if (isVisible) {
          if (documentColorsCount !== 0) {
            this.colorTableView.updateDocumentColors(
              editor.model,
              this.componentName
            )
          }
          this.colorTableView.appendGrids()
        }
      })

      return dropdownView
    })
  }
}
