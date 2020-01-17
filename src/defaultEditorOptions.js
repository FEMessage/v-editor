import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'

import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'

import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

export default {
  plugins: [
    Essentials,
    Autoformat,
    Font,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    BlockQuote,
    HorizontalLine,
    CKFinder,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    FileRepository,
    Indent,
    Link,
    List,
    TodoList,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar
  ],
  toolbar: [
    'undo',
    'redo',
    '|',
    'heading',
    'fontSize',
    '|',
    'bold',
    'italic',
    'strikethrough',
    'underline',
    '|',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bulletedList',
    'numberedList',
    'todoList',
    {
      type: 'dropdown',
      title: 'Indents',
      items: ['indent', 'outdent']
    },
    '|',
    'link',
    'blockQuote',
    'horizontalLine',
    '|',
    'imageUpload',
    'insertTable',
    'mediaEmbed'
  ],
  image: {
    resizeUnit: 'px',
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  }
}
