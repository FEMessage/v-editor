import generateUIPlugin from '../generateUIPlugin'

import MediaEmbedEditing from '@ckeditor/ckeditor5-media-embed/src/mediaembedediting'
import AutoMediaEmbed from './AutoMediaEmbed'
import MediaEmbedUI from '@ckeditor/ckeditor5-media-embed/src/mediaembedui'
import MediaFormView from '@ckeditor/ckeditor5-media-embed/src/ui/mediaformview'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

import {createDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import DropdownButtonView from '../Dropdown-ButtonView'

import '@ckeditor/ckeditor5-media-embed/theme/mediaembed.css'

import mediaIcon from '../../assets/media.svg'

function getFormValidators(registry) {
  return [
    form => {
      if (!form.url.length) {
        return 'URL不能为空'
      }
    },
    form => {
      if (!registry.hasMedia(form.url)) {
        return '这个媒体链接不支持'
      }
    }
  ]
}
class MediaEmbedUICustom extends MediaEmbedUI {
  init() {
    const editor = this.editor
    const command = editor.commands.get('mediaEmbed')
    const registry = editor.plugins.get(MediaEmbedEditing).registry

    /**
     * The form view displayed inside the drop-down.
     *
     * @member {module:media-embed/ui/mediaformview~MediaFormView}
     */
    this.form = new MediaFormView(getFormValidators(registry), editor.locale)

    // Setup `imageUpload` button.
    editor.ui.componentFactory.add('mediaEmbed', locale => {
      const dropdown = createDropdown(locale, DropdownButtonView)

      this._setUpDropdown(dropdown, this.form, command, editor)
      this._setUpForm(this.form, dropdown, command)

      return dropdown
    })
  }
  _setUpDropdown(dropdown, form, command) {
    const editor = this.editor
    const button = dropdown.buttonView

    dropdown.bind('isEnabled').to(command)
    dropdown.panelView.children.add(form)

    button.set({
      label: '插入媒体',
      icon: mediaIcon,
      tooltip: true
    })

    button.on(
      'open',
      () => {
        form.url = command.value || ''
        form.urlInputView.select()
        form.focus()
      },
      {priority: 'low'}
    )

    dropdown.on('submit', () => {
      if (form.isValid()) {
        editor.execute('mediaEmbed', form.url)
        closeUI()
      }
    })

    dropdown.on('change:isOpen', () => form.resetFormStatus())
    dropdown.on('cancel', () => closeUI())

    function closeUI() {
      editor.editing.view.focus()
      dropdown.isOpen = false
    }
  }
}

export default generateUIPlugin('MediaEmbed', [
  MediaEmbedEditing,
  MediaEmbedUICustom,
  AutoMediaEmbed,
  Widget
])
