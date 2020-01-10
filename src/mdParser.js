const SPACE = '(?:&nbsp;|\\s)'

const HEAD = `(#){1,4}${SPACE}`
const UL = [`-${SPACE}`, 'insertUnorderedList']
const OL = [`\\d\\.${SPACE}`, 'insertOrderedList']

const p = symbol => `\\<(?:div|p)\\>${symbol}(.*?)\\<\\/(?:div|p)\\>`

const rexTest = (rex, html) => RegExp(p(rex)).test(html)

const replacer = (editor, reg) => {
  const ele = editor.selection.getSelectionContainerElem()[0]
  ele.innerHTML = ele.innerHTML.replace(reg, '<br>')
}

/**
 * markdown 语法转换
 *
 * @param {String} html onChange 文本
 * @param {Object} editor 编辑器实例
 */
const mdParser = (html, editor) => {
  const isHEAD = rexTest(HEAD, html)
  const isUL = rexTest(UL[0], html)
  const isOL = rexTest(OL[0], html)

  if (isHEAD) {
    const reg = RegExp(p(HEAD))
    const match = reg.exec(html)

    let size = 0
    match[0].replace(/#{1,}/g, text => (size = text.length))

    editor.menus.menus.head._command(`h${size}`)
    replacer(editor, /#{1,4}(?:&nbsp;|\s)/g)
  } else if (isUL) {
    replacer(editor, RegExp(`${UL[0]}`, 'g'))
    editor.menus.menus.list._command(UL[1])
  } else if (isOL) {
    replacer(editor, RegExp(`${OL[0]}`, 'g'))
    editor.menus.menus.list._command(OL[1])
  }
}

export default mdParser
