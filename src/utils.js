import {debounce} from 'lodash-es'

export const inputDebounce = fn => debounce(fn, 300)
