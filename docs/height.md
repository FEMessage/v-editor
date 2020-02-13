自定义编辑区高度，建议直接使用 css 来设置内部编辑区。注意是`.ck-editor__main`下紧跟的子元素`.ck-content`

```vue
<template>
  <v-editor class="demo" v-model="content" />
</template>
<script>
export default {
  data() {
    return {
      content: '',
    }
  },
  watch: {
    content(val, oldVal) {
      //打印填写内容
      console.log(val)
    }
  },
  created() {
    // HACK: styleguide 示例里面用不了 style block
    document.querySelector('style').sheet.insertRule(`
    .demo .ck-editor__main > .ck-content {
      height: 400px
    }`)
  }
}
</script>
```
