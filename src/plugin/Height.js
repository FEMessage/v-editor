/**
 * extendTemplate 只能在创建时调用，无法运行时更改
 *
 * @see https://stackoverflow.com/questions/46559354/how-to-set-the-height-of-ckeditor-5-classic-editor/56550285#56550285
 */
export default function(editor) {
  let height = editor.config.get('height')
  if (!isNaN(+height)) height += 'px'
  editor.ui.view.editable.extendTemplate({
    attributes: {
      style: {
        height
      }
    }
  })
}
