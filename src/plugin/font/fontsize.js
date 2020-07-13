import generateUIPlugin from '../generateUIPlugin'
import FontSizeEditing from '@ckeditor/ckeditor5-font/src/fontsize/fontsizeediting'

/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/fontsize/fontsizeui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Model from '@ckeditor/ckeditor5-ui/src/model'
import Collection from '@ckeditor/ckeditor5-utils/src/collection'

import {
  createDropdown,
  addListToDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import {normalizeOptions} from '@ckeditor/ckeditor5-font/src/fontsize/utils'

// import fontSizeIcon from '../../theme/icons/font-size.svg'
import '@ckeditor/ckeditor5-font/theme/fontsize.css'

const FONT_SIZE = 'fontSize'
/**
 * The font size UI plugin. It introduces the `'fontSize'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
class FontSizeUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    const options = this._getLocalizedOptions()
    const command = editor.commands.get(FONT_SIZE)

    // Register UI component.
    editor.ui.componentFactory.add(FONT_SIZE, locale => {
      const dropdownView = createDropdown(locale)
      addListToDropdown(dropdownView, _prepareListOptions(options, command))

      // Create dropdown model.
      dropdownView.buttonView.set({
        label: '字体大小',
        withText: true,
        tooltip: true
      })

      dropdownView.extendTemplate({
        attributes: {
          class: ['ck-font-size-dropdown']
        }
      })

      dropdownView.bind('isEnabled').to(command)

      dropdownView.buttonView.bind('label').to(command, 'value', value => {
        if (typeof value === 'number') {
          value += 'px'
        }
        return value || '字体大小'
      })

      // Execute command when an item from the dropdown is selected.
      this.listenTo(dropdownView, 'execute', evt => {
        editor.execute(evt.source.commandName, {value: evt.source.commandParam})
        editor.editing.view.focus()
      })

      return dropdownView
    })
  }

  /**
   * Returns options as defined in `config.fontSize.options` but processed to account for
   * editor localization, i.e. to display {@link module:font/fontsize~FontSizeOption}
   * in the correct language.
   *
   * Note: The reason behind this method is that there is no way to use {@link module:utils/locale~Locale#t}
   * when the user configuration is defined because the editor does not exist yet.
   *
   * @private
   * @returns {Array.<module:font/fontsize~FontSizeOption>}.
   */
  _getLocalizedOptions() {
    const editor = this.editor
    const localizedTitles = {
      Default: '默认大小',
      Tiny: '超小',
      Small: '小',
      Big: '大',
      Huge: '超大'
    }

    const options = normalizeOptions(editor.config.get(FONT_SIZE).options)

    return options.map(option => {
      const title = localizedTitles[option.title]

      if (title && title != option.title) {
        // Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
        option = Object.assign({}, option, {title})
      }

      return option
    })
  }
}

// Prepares FontSize dropdown items.
// @private
// @param {Array.<module:font/fontsize~FontSizeOption>} options
// @param {module:font/fontsize/fontsizecommand~FontSizeCommand} command
function _prepareListOptions(options, command) {
  const itemDefinitions = new Collection()
  // console.log(options)
  for (const option of options) {
    const def = {
      type: 'button',
      model: new Model({
        commandName: FONT_SIZE,
        commandParam: option.model,
        label: option.title,
        class: `ck-fontsize-option ck-fontsize-option-${option.title}`,
        withText: true
      })
    }

    if (option.view && option.view.styles) {
      def.model.set(
        'labelStyle',
        `font-size:${option.view.styles['font-size']}`
      )
    }

    if (option.view && option.view.classes) {
      def.model.set('class', `${def.model.class} ${option.view.classes}`)
    }

    def.model.bind('isOn').to(command, 'value', value => value === option.model)

    // Add the option to the collection.
    itemDefinitions.add(def)
  }

  return itemDefinitions
}

export default generateUIPlugin('FontSize', [FontSizeEditing, FontSizeUI])
