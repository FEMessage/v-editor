import generateUIPlugin from './generateUIPlugin'
import ListEditing from '@ckeditor/ckeditor5-list/src/listediting'

/**
 * @module list/listui
 */

import {createUIComponent} from '@ckeditor/ckeditor5-list/src/utils'

import numberedListIcon from '../assets/numberedlist.svg'
import bulletedListIcon from '../assets/bulletedlist.svg'

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

/**
 * The list UI feature. It introduces the `'numberedList'` and `'bulletedList'` buttons that
 * allow to convert paragraphs to and from list items and indent or outdent them.
 *
 * @extends module:core/plugin~Plugin
 */
class ListUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    // Create two buttons and link them with numberedList and bulletedList commands.
    createUIComponent(this.editor, 'numberedList', '有序列表', numberedListIcon)
    createUIComponent(this.editor, 'bulletedList', '无序列表', bulletedListIcon)
  }
}

export default generateUIPlugin('List', [ListEditing, ListUI])
