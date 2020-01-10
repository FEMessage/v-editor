/**
 * 一些小说明:
 * `editor.$textElem[0]` 指的是实际可编辑的输入框
 */

const toolbarItems = []

export default {
  beforeDestory() {
    // 清除每个 menuItem 的点击事件监听器
    if (toolbarItems.length) {
      toolbarItems.forEach(item => {
        item.removeEventListener('click', this.handleMenuItemClick)
      })
    }

    this.editor.$textElem[0].removeEventListener(
      'focus',
      this.handleTextElementFocus
    )
    this.editor.$textElem[0].removeEventListener(
      'blur',
      this.handleTextElementBlur
    )
  },

  methods: {
    initFocusHack() {
      // 初始使之失焦以使得编辑框 `聚焦` 或 `失焦` 时得到理想效果
      this.editor.$textElem[0].blur()

      this.editor.$textElem[0].addEventListener(
        'focus',
        this.handleTextElementFocus
      )

      this.editor.$textElem[0].addEventListener(
        'blur',
        this.handleTextElementBlur
      )
    },

    initToolbarItemFocusHack(item) {
      item.addEventListener('click', this.handleMenuItemClick)
      toolbarItems.push(item)
    },

    handleMenuItemClick() {
      // this.editor.$textElem[0].focus()
      this.enableUpdateValue = false
    },

    handleTextElementBlur() {
      this.enableUpdateValue = true
    },

    handleTextElementFocus() {
      this.enableUpdateValue = false
    }
  }
}
