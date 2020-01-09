const SPACE = '(?:&nbsp;|\\s)'

const HEAD = `(#){1,4}${SPACE}`
const UL = [`-${SPACE}`, 'insertUnorderedList']
const OL = [`\\d\\.${SPACE}`, 'insertOrderedList']

const p = symbol => `\\<(?:div|p)\\>${symbol}(.*?)\\<\\/(?:div|p)\\>`

/**
 * markdown 语法转换
 *
 * 该版本有两个问题：
 * 1. 如果要清空 md 语法文本，格式会在最后一行生效
 * 2. 如果要在中间插入文本，md 语法文本无法清空
 *
 * @param {String} html onChange 文本
 * @param {Object} editor 编辑器实例
 */
const mdParser = (html, editor) => {
  if (RegExp(p(HEAD)).test(html)) {
    const reg = RegExp(p(HEAD))
    const match = reg.exec(html)

    if (!match) return html

    let size = 0
    match[0].replace(/#{1,}/g, text => (size = text.length))

    editor.txt.html(
      html.replace(RegExp(`\\<(div|p)\\>#{1,4}${SPACE}*`), `<$1><br>`)
    )
    editor.menus.menus.head._command(`h${size}`)
  } else if (RegExp(p(UL[0])).test(html)) {
    editor.txt.html(
      html.replace(RegExp(`\\<(div|p)\\>${UL[0]}${SPACE}*`), `<$1><br>`)
    )
    editor.menus.menus.list._command(UL[1])
  } else if (RegExp(p(OL[0])).test(html)) {
    editor.txt.html(
      html.replace(RegExp(`\\<(div|p)\\>${OL[0]}${SPACE}*`), `<$1><br>`)
    )
    editor.menus.menus.list._command(OL[1])
  }
}

export default mdParser
