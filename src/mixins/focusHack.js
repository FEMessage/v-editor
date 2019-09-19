/**
 * 一些小说明:
 * `editor.$textElem[0]` 指的是实际可编辑的输入框
 */

const menuItemsStore = []

export default {
  beforeDestory() {
    if (menuItemsStore.length) {
      menuItemsStore.forEach(item => {
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
    initTextElementEvent() {
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

    handleMenuItemClick() {
      this.editor.$textElem[0].focus()
      this.enableUpdateValue = false
    },

    addToolbarItemClickEvent(item) {
      item.addEventListener('click', this.handleMenuItemClick)
      menuItemsStore.push(item)
    },

    handleTextElementBlur() {
      this.enableUpdateValue = true
    },

    handleTextElementFocus() {
      this.enableUpdateValue = false
    }
  }
}
