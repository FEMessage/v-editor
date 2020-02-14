/**
 * https://github.com/ckeditor/ckeditor5-remove-format/tree/master
 * 在官方 remove-format 基础上：
 * - links 也会被清除
 * - 图标改成橡皮擦，和 fontColor 的清除图标一样
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import RemoveFormatUI from './RemoveFormatUI'
import RemoveFormatLinks from './RemoveFormatLinks'
import RemoveFormatEditing from '@ckeditor/ckeditor5-remove-format/src/removeformatediting'

export default class RemoveFormat extends Plugin {
  static get requires() {
    return [RemoveFormatEditing, RemoveFormatUI, RemoveFormatLinks]
  }
  static get pluginName() {
    return 'RemoveFormat'
  }
}
