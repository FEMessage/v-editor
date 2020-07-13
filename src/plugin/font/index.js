import generateUIPlugin from '../generateUIPlugin'
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/font
 */

import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSize from './fontsize'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'

/**
 * A plugin that enables a set of text styling features:
 *
 * * {@link module:font/fontsize~FontSize},
 * * {@link module:font/fontfamily~FontFamily}.
 * * {@link module:font/fontcolor~FontColor},
 * * {@link module:font/fontbackgroundcolor~FontBackgroundColor}.
 *
 * For a detailed overview, check the {@glink features/font Font feature} documentation
 * and the {@glink api/font package page}.
 *
 * @extends module:core/plugin~Plugin
 */
export default generateUIPlugin('Font', [
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor
])
