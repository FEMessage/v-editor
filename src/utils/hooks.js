export default {
  /**
   * @typedef {(...args: any[]) => any} hook
   * @type {{[k: string]: Array<hook>}}
   */
  hooks: {},
  /**
   * @param {string} name
   * @param {hook} fn
   */
  add(name, fn) {
    this.hooks[name] = this.hooks[name] || []
    this.hooks[name].push(fn)
    return this
  },
  /**
   * @param {string} name
   * @param {any[]} args
   */
  invoke(name, ...args) {
    for (const fn of this.hooks[name] || []) {
      fn(...args)
    }
    return this
  },
  /**
   * @type {(name: string) => void}
   */
  clean(name) {
    if (this.hooks[name]) this.hooks[name].length = 0
  }
}
