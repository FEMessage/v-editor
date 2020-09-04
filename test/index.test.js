import {replaceNewlineWithBr} from '../src/utils'

test('replaceNewlineWithBr', () => {
  const strInWindows = '1.登录平台，选择需求池tab\r\n2.需求列表有需求'
  const strInUnix = '1.登录平台，选择需求池tab\n2.需求列表有需求'
  const normalStr = `1.登录平台，选择需求池tab<br>2.需求列表有需求`
  expect(replaceNewlineWithBr(strInWindows)).toBe(normalStr)
  expect(replaceNewlineWithBr(strInUnix)).toBe(normalStr)
})
