import generateUIPlugin from './generateUIPlugin'
import HeadingEditing from '@ckeditor/ckeditor5-heading/src/headingediting'

import '@ckeditor/ckeditor5-heading/theme/heading.css'

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Model from '@ckeditor/ckeditor5-ui/src/model'

import {
  createDropdown,
  addListToDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import {getLocalizedOptions} from '@ckeditor/ckeditor5-heading/src/utils'
import DropdownButtonView from './DropdownButtonView'

import Collection from '@ckeditor/ckeditor5-utils/src/collection'

import '@ckeditor/ckeditor5-heading/theme/heading.css'

class HeadingUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    const options = getLocalizedOptions(editor)
    const defaultTitle = '选择标题'
    const dropdownTooltip = '标题'

    // Register UI component.
    editor.ui.componentFactory.add('heading', locale => {
      const titles = {}
      const itemDefinitions = new Collection()

      const headingCommand = editor.commands.get('heading')
      const paragraphCommand = editor.commands.get('paragraph')

      const commands = [headingCommand]

      for (const option of options) {
        const def = {
          type: 'button',
          model: new Model({
            label: option.title,
            class: option.class,
            withText: true
          })
        }

        if (option.model === 'paragraph') {
          def.model.bind('isOn').to(paragraphCommand, 'value')
          def.model.set('commandName', 'paragraph')
          commands.push(paragraphCommand)
        } else {
          def.model
            .bind('isOn')
            .to(headingCommand, 'value', value => value === option.model)
          def.model.set({
            commandName: 'heading',
            commandValue: option.model
          })
        }

        // Add the option to the collection.
        itemDefinitions.add(def)

        titles[option.model] = option.title
      }

      const dropdownView = createDropdown(locale, DropdownButtonView)
      addListToDropdown(dropdownView, itemDefinitions)

      dropdownView.buttonView.set({
        isOn: false,
        withText: true,
        tooltip: dropdownTooltip
      })

      dropdownView.extendTemplate({
        attributes: {
          class: ['ck-heading-dropdown']
        }
      })

      dropdownView
        .bind('isEnabled')
        .toMany(commands, 'isEnabled', (...areEnabled) => {
          return areEnabled.some(isEnabled => isEnabled)
        })

      dropdownView.buttonView
        .bind('label')
        .to(
          headingCommand,
          'value',
          paragraphCommand,
          'value',
          (value, para) => {
            const whichModel = value || (para && 'paragraph')
            // If none of the commands is active, display default title.
            return titles[whichModel] ? titles[whichModel] : defaultTitle
          }
        )

      // Execute command when an item from the dropdown is selected.
      this.listenTo(dropdownView, 'execute', evt => {
        editor.execute(
          evt.source.commandName,
          evt.source.commandValue ? {value: evt.source.commandValue} : undefined
        )
        editor.editing.view.focus()
      })

      return dropdownView
    })
  }
}

export default generateUIPlugin('Heading', [HeadingEditing, HeadingUI])
