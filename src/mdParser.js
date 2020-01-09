const SPACE = '[&nbsp;|\\s]'

const HEAD = `(#){1,4}${SPACE}`
const UL = [`-${SPACE}`, 'insertUnorderedList']
const OL = [`\\d\\.${SPACE}`, 'insertOrderedList']

const p = symbol => `\\<[p|div]\\>${symbol}(.*?)\\<\\/[p|div]\\>`

const mdParser = (html, editor) => {
  if (RegExp(p(HEAD)).test(html)) {
    const reg = RegExp(p(HEAD))
    const match = reg.exec(html)

    if (!match) return html

    let size = 0
    match[0].replace(/#{1,}/g, text => (size = text.length))

    editor.txt.html(
      html.replace(RegExp(`\\<div\\>#{1,4}${SPACE}*`), `<div><br>`)
    )
    editor.txt.html(html.replace(RegExp(`\\<p\\>#{1,4}${SPACE}*`), `<p><br>`))
    editor.cmd.do('formatBlock', `<h${size}>`)
  } else if (RegExp(p(UL[0])).test(html)) {
    editor.txt.html(
      html.replace(RegExp(`\\<div\\>${UL[0]}${SPACE}*`), `<div><br>`)
    )
    editor.txt.html(html.replace(RegExp(`\\<p\\>${UL[0]}${SPACE}*`), `<p><br>`))
    editor.cmd.do(UL[1])
  } else if (RegExp(p(OL[0])).test(html)) {
    editor.txt.html(
      html.replace(RegExp(`\\<div\\>${OL[0]}${SPACE}*`), `<div><br>`)
    )
    editor.txt.html(html.replace(RegExp(`\\<p\\>${OL[0]}${SPACE}*`), `<p><br>`))
    editor.cmd.do(OL[1])
  }
}

export default mdParser
