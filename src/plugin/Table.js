import generateUIPlugin from './generateUIPlugin'

import TableEditing from '@ckeditor/ckeditor5-table/src/tableediting'
import TableUI from '@ckeditor/ckeditor5-table/src/tableui'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

import '@ckeditor/ckeditor5-table/theme/table.css'

import {createDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import InsertTableView from '@ckeditor/ckeditor5-table/src/ui/inserttableview'

import tableIcon from '../assets/table.svg'
import tableColumnIcon from '@ckeditor/ckeditor5-table/theme/icons/table-column.svg'
import tableRowIcon from '@ckeditor/ckeditor5-table/theme/icons/table-row.svg'
import tableMergeCellIcon from '@ckeditor/ckeditor5-table/theme/icons/table-merge-cell.svg'

class TableUICustom extends TableUI {
  init() {
    this.addInsertTable()
    this.addTableColumn()
    this.addTableRow()
    this.addMergeTableCells()
  }
  addInsertTable() {
    const editor = this.editor
    editor.ui.componentFactory.add('insertTable', locale => {
      const command = editor.commands.get('insertTable')
      const dropdownView = createDropdown(locale)

      dropdownView.bind('isEnabled').to(command)

      // Decorate dropdown's button.
      dropdownView.buttonView.set({
        icon: tableIcon,
        label: '插入表格',
        tooltip: true
      })

      // Prepare custom view for dropdown's panel.
      const insertTableView = new InsertTableView(locale)
      dropdownView.panelView.children.add(insertTableView)

      insertTableView.delegate('execute').to(dropdownView)

      dropdownView.buttonView.on('open', () => {
        // Reset the chooser before showing it to the user.
        insertTableView.rows = 0
        insertTableView.columns = 0
      })

      dropdownView.on('execute', () => {
        editor.execute('insertTable', {
          rows: insertTableView.rows,
          columns: insertTableView.columns
        })
        editor.editing.view.focus()
      })

      return dropdownView
    })
  }
  addTableColumn() {
    const editor = this.editor
    const contentLanguageDirection = editor.locale.contentLanguageDirection
    const isContentLtr = contentLanguageDirection === 'ltr'
    editor.ui.componentFactory.add('tableColumn', locale => {
      const options = [
        {
          type: 'switchbutton',
          model: {
            commandName: 'setTableColumnHeader',
            label: '标题列',
            bindIsOn: true
          }
        },
        {type: 'separator'},
        {
          type: 'button',
          model: {
            commandName: isContentLtr
              ? 'insertTableColumnLeft'
              : 'insertTableColumnRight',
            label: '向左插入列'
          }
        },
        {
          type: 'button',
          model: {
            commandName: isContentLtr
              ? 'insertTableColumnRight'
              : 'insertTableColumnLeft',
            label: '向右插入列'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'removeTableColumn',
            label: '删除列'
          }
        }
      ]

      return this._prepareDropdown('列', tableColumnIcon, options, locale)
    })
  }
  addTableRow() {
    const editor = this.editor
    editor.ui.componentFactory.add('tableRow', locale => {
      const options = [
        {
          type: 'switchbutton',
          model: {
            commandName: 'setTableRowHeader',
            label: '标题行',
            bindIsOn: true
          }
        },
        {type: 'separator'},
        {
          type: 'button',
          model: {
            commandName: 'insertTableRowBelow',
            label: '向下插入一行'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'insertTableRowAbove',
            label: '向上插入一行'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'removeTableRow',
            label: '删除本行'
          }
        }
      ]

      return this._prepareDropdown('行', tableRowIcon, options, locale)
    })
  }
  addMergeTableCells() {
    const editor = this.editor
    const contentLanguageDirection = editor.locale.contentLanguageDirection
    const isContentLtr = contentLanguageDirection === 'ltr'
    editor.ui.componentFactory.add('mergeTableCells', locale => {
      const options = [
        {
          type: 'button',
          model: {
            commandName: 'mergeTableCellUp',
            label: '向上合并单元格'
          }
        },
        {
          type: 'button',
          model: {
            commandName: isContentLtr
              ? 'mergeTableCellRight'
              : 'mergeTableCellLeft',
            label: '向右合并单元格'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'mergeTableCellDown',
            label: '向下合并单元格'
          }
        },
        {
          type: 'button',
          model: {
            commandName: isContentLtr
              ? 'mergeTableCellLeft'
              : 'mergeTableCellRight',
            label: '向左合并单元格'
          }
        },
        {type: 'separator'},
        {
          type: 'button',
          model: {
            commandName: 'splitTableCellVertically',
            label: '垂直拆分单元格'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'splitTableCellHorizontally',
            label: '水平拆分单元格'
          }
        }
      ]

      return this._prepareDropdown(
        '合并单元格',
        tableMergeCellIcon,
        options,
        locale
      )
    })
  }
}

export default generateUIPlugin('Table', [TableEditing, TableUICustom, Widget])
