import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import {UploadAdapter} from '../utils/adapter'

export default uploader =>
  class ImageUploadAdaptor extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
      return [FileRepository]
    }

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
      const options = this.editor.config.get('imageUploadOption')
      this.editor.plugins.get(FileRepository).createUploadAdapter = loader => {
        return new UploadAdapter(loader, options, uploader)
      }
    }
  }
