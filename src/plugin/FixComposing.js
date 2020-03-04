/**
 * @hack 如果哪天崩了要看回 @ckeditor/ckeditor5-engine/src/view/{view|renderer}.js 源码
 * 已知负面影响：在线协作功能
 *
 * 详情看相关 issues & pr：
 * - https://github.com/ckeditor/ckeditor5/issues/5877
 * - https://github.com/ckeditor/ckeditor5-engine/pull/861
 *
 * PS：这个可能是更优的方案，如果还有问题的话可以参考
 * https://github.com/ckeditor/ckeditor5/issues/5877#issuecomment-566369164
 * https://github.com/mycolorway/ckeditor5-engine/commit/7d921207054e327088fe7496a8cde451ddd87423
 */
export default function(editor) {
  const {_renderer, document} = editor.editing.view
  /**
   * 注入 isComposing，在 render 中使用
   * @see https://github.com/ckeditor/ckeditor5-engine/pull/861/files#diff-644366cecbdf61171130f59482de38e0R114
   */
  _renderer.bind('isComposing').to(document)
  const {render} = _renderer
  /**
   * 输入法进行间停止 render
   * https://github.com/ckeditor/ckeditor5-engine/pull/861/files#diff-4c87133ed830fc4ea0646426deba32cfR188
   */
  _renderer.render = function() {
    // console.log('isComposing', this.isComposing)
    if (this.isComposing) return
    return render.call(this)
  }
}
