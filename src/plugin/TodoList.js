import generateUIPlugin from './generateUIPlugin'
import TodoListEditing from '@ckeditor/ckeditor5-list/src/todolistediting'
/**
 * @module list/todolistui
 */

import {createUIComponent} from '@ckeditor/ckeditor5-list/src/utils'
import todoListIcon from '../assets/todolist.svg'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

/**
 * The to-do list UI feature. It introduces the `'todoList'` button that
 * allows to convert elements to and from to-do list items and to indent or outdent them.
 *
 * @extends module:core/plugin~Plugin
 */
class TodoListUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const t = this.editor.t

    createUIComponent(this.editor, 'todoList', t('To-do List'), todoListIcon)
  }
}

export default generateUIPlugin('todoList', [TodoListEditing, TodoListUI])
