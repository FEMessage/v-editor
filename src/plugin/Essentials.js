import generateUIPlugin from './generateUIPlugin'
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
import Enter from '@ckeditor/ckeditor5-enter/src/enter'
import ShiftEnter from '@ckeditor/ckeditor5-enter/src/shiftenter'
import SelectAll from '@ckeditor/ckeditor5-select-all/src/selectall'
import Typing from '@ckeditor/ckeditor5-typing/src/typing'
import Undo from './Undo'

export default generateUIPlugin('Essentials', [
  Clipboard,
  Enter,
  ShiftEnter,
  Typing,
  Undo,
  SelectAll
])
