import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import {UploadAdapter} from '../utils/adapter'

export default uploader =>
  class ImageUploader extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
      return 'ImageUploader'
    }

    /**
     * @inheritDoc
     */
    init() {
      const options = this.editor.config.get('uploadOptions')
      this.editor.plugins.get(
        'FileRepository'
      ).createUploadAdapter = loader => {
        return new UploadAdapter(loader, options, uploader)
      }
    }
  }
