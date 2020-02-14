自定义菜单

> lodash.merge 的覆盖规则是数组项合并类似 concat；
> 目前似乎无法自定义 toolbar；要么这里改例子要么改代码

```vue
<template>
  <v-editor v-model="content" :editor-options="editorOptions"/>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      editorOptions: {
        toolbar: [
          'undo',
          'redo',
          'fullScreen',
          '|',
          'heading',
          'fontSize',
        ],
        fontSize: {
          options: [10, 12, 14, 'default', 18, 22, 24]
        },
      }
    }
  },
  watch: {
    content(val, oldVal) {
      //打印填写内容
      console.log(val)
    }
  }
}
</script>
```
