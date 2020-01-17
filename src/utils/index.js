import crypto from 'crypto-browserify'
import {debounce} from 'lodash-es'

export const inputDebounce = fn => debounce(fn, 300)
