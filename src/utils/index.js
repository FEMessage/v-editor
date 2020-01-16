import crypto from 'crypto-browserify'
import {debounce} from 'lodash-es'

export const inputDebounce = fn => debounce(fn, 300)

export function getSignature(origin, timestamp) {
  const param = {
    origin,
    timestamp,
    signatureMethod: 'HMAC-SHA1'
  }
  const paramStr = Object.keys(param)
    .sort()
    .map(k => `${k}=${encodeURIComponent(param[k])}`)
    .join('&')
  const signStr = 'POST&%2F&' + encodeURIComponent(paramStr)

  return crypto
    .createHmac('sha1', 'nonce')
    .update(signStr)
    .digest('base64')
}
