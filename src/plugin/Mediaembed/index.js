import generateUIPlugin from '../generateUIPlugin'

import MediaEmbedEditing from '@ckeditor/ckeditor5-media-embed/src/mediaembedediting'
import AutoMediaEmbed from './AutoMediaEmbed'
import MediaEmbedUI from '@ckeditor/ckeditor5-media-embed/src/mediaembedui'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

import '@ckeditor/ckeditor5-media-embed/theme/mediaembed.css'

import mediaIcon from '../../assets/media.svg'

class MediaEmbedUICustom extends MediaEmbedUI {
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
