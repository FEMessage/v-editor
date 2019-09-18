const menuItemsStore = []

export default {
  mounted() {
    this.$nextTick(() => {
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
    })
  },

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
    handleMenuItemClick() {
      this.editor.$textElem[0].focus()
      this.enableUpdateValue = false
    },

    addToolbarItemClickEvent(item) {
      item.addEventListener('click', this.handleMenuItemClick)
      menuItemsStore.push(item)
    },

    handleTextElementBlur() {
      this.enableUpdateValue = false
    },

    handleTextElementFocus() {
      this.enableUpdateValue = true
    }
  }
}
