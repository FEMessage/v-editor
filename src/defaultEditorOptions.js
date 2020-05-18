import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
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

import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

// 本地插件
import Autoformat from './plugin/Autoformat'
import FullScreen from './plugin/FullScreen'
import ExtraFormat from './plugin/ExtraFormat'
import RemoveFormat from './plugin/RemoveFormat'
import AttachmentUpload from './plugin/AttachmentUpload'
import FixComposing from './plugin/FixComposing'
import TransformMD from './plugin/TransformMD'

export default {
  plugins: [
    Essentials,
    Autosave,
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
    Indent,
    Link,
    List,
    TodoList,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar,
    FullScreen,
    ExtraFormat,
    RemoveFormat,
    AttachmentUpload,
    TransformMD,
    FixComposing
  ],
  toolbar: [
    'undo',
    'redo',
    'fullScreen',
    'removeFormat',
    '|',
    'heading',
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
    '|',
    'link',
    'blockQuote',
    'horizontalLine',
    '|',
    'imageUpload',
    'AttachmentUpload',
    'insertTable',
    'mediaEmbed'
  ],
  heading: {
    options: [
      {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4'
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5'
      }
    ]
  },
  image: {
    resizeUnit: 'px',
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  link: {
    addTargetToExternalLinks: true
  }
}
