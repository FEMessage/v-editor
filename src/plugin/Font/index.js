import generateUIPlugin from '../generateUIPlugin'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontColor from './FontColor'
import FontBackgroundColor from './FontBackgroundColor'

export default generateUIPlugin('Font', [
  FontFamily,
  FontColor,
  FontBackgroundColor
])
