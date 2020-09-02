import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'

import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

// 本地魔改插件
import Essentials from './plugin/Essentials'
import Font from './plugin/Font'
import Bold from './plugin/Bold'
import Italic from './plugin/Italic'
import Strikethrough from './plugin/Strikethrough'
import Underline from './plugin/Underline'
import List from './plugin/List'
import TodoList from './plugin/TodoList'
import Link from './plugin/Link'
import BlockQuote from './plugin/Blockquote'
import HorizontalLine from './plugin/Horizontalline'
import ImageUpload from './plugin/ImageUpload'
import Table from './plugin/Table'
import MediaEmbed from './plugin/Mediaembed'
import Heading from './plugin/Heading'

// 本地插件
import Autoformat from './plugin/Autoformat'
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
    ExtraFormat,
    RemoveFormat,
    AttachmentUpload,
    TransformMD,
    FixComposing
  ],
  toolbar: [
    'undo',
    'redo',
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
      {model: 'paragraph', title: '正文', class: 'ck-heading_paragraph'},
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
      }
    ]
  },
  image: {
    resizeUnit: 'px',
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative',
      'imagePreview'
    ]
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  link: {
    addTargetToExternalLinks: true
  }
}
