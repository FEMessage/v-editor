import generateUIPlugin from './generateUIPlugin'
import ImageUploadProgress from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadprogress'
import ImageUploadEditing from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadediting'

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview'
import {createImageTypeRegExp} from '@ckeditor/ckeditor5-image/src/imageupload/utils'
import imageIcon from '../assets/image.svg'

class ImageUploadUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor
    // Setup `imageUpload` button.
    editor.ui.componentFactory.add('imageUpload', locale => {
      const view = new FileDialogButtonView(locale)
      const command = editor.commands.get('imageUpload')
      const imageTypes = editor.config.get('image.upload.types')
      const imageTypesRegExp = createImageTypeRegExp(imageTypes)

      view.set({
        acceptedType: imageTypes.map(type => `image/${type}`).join(','),
        allowMultipleFiles: true
      })

      view.buttonView.set({
        label: '插入图像',
        icon: imageIcon,
        tooltip: true
      })

      view.buttonView.bind('isEnabled').to(command)

      view.on('done', (evt, files) => {
        const imagesToUpload = Array.from(files).filter(file =>
          imageTypesRegExp.test(file.type)
        )

        if (imagesToUpload.length) {
          editor.execute('imageUpload', {file: imagesToUpload})
        }
      })

      return view
    })
  }
}

export default generateUIPlugin('ImageUpload', [
  ImageUploadEditing,
  ImageUploadUI,
  ImageUploadProgress
])
