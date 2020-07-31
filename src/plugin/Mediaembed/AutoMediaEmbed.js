import AutoMediaEmbed from '@ckeditor/ckeditor5-media-embed/src/automediaembed'
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'

import Undo from '../Undo'

export default class AutoMediaEmbedCustom extends AutoMediaEmbed {
  static get requires() {
    return [Clipboard, Undo]
  }
}
