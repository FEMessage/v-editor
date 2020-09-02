import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import {UploadAdapter} from '../utils/adapter'

/**
 * @param {function} uploadFunc upload function for upload image and attachment
 */
export default uploadFunc =>
  class Uploader extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
      return 'Uploader'
    }

    /**
     * @inheritDoc
     */
    init() {
      const {editor} = this
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new UploadAdapter(loader, uploadFunc)
      }
    }
  }
