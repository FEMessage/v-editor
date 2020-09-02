import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import imageIcon from '../assets/zoom.svg'

export default previewFunc =>
  class ImagePreview extends Plugin {
    static get pluginName() {
      return 'imagePreview'
    }
    init() {
      const editor = this.editor

      editor.ui.componentFactory.add('imagePreview', locale => {
        const view = new ButtonView(locale)
        view.set({
          label: editor.t('Preview'),
          icon: imageIcon,
          tooltip: true
        })

        // Callback executed once the image preview button is clicked.
        view.on('execute', () => {
          const el = this.editor.model.document.selection.getSelectedElement()
          const picUrl = el && el.getAttribute('src')
          previewFunc(picUrl)
        })

        return view
      })
    }
  }
