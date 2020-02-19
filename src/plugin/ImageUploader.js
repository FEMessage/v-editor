import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import {UploadAdapter} from '../utils/adapter'

export default uploadImg =>
  class ImageUploadAdaptor extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
      return 'ImageUploadAdaptor'
    }

    /**
     * @inheritDoc
     */
    init() {
      const {editor} = this
      const options = editor.config.get('imageUploadOption')
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new UploadAdapter(loader, options, uploadImg)
      }
    }
  }
