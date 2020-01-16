import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import {UploadAdapter} from '../utils/adapter'

export default class ImageUploader extends Plugin {
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
    this.editor.plugins.get(FileRepository).createUploadAdapter = loader => {
      return new UploadAdapter(loader, options)
    }
  }
}
