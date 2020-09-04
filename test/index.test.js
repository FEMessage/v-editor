import {replaceNewline} from '../src/utils'

test('replaceNewlineWithBr', () => {
  const replaceStr = '<br>'
  const strInWindows = '1.登录平台，选择需求池tab\r\n2.需求列表有需求'
  const strInUnix = '1.登录平台，选择需求池tab\n2.需求列表有需求'
  const normalStr = `1.登录平台，选择需求池tab${replaceStr}2.需求列表有需求`
  expect(replaceNewline(strInWindows, replaceStr)).toBe(normalStr)
  expect(replaceNewline(strInUnix, replaceStr)).toBe(normalStr)
})
