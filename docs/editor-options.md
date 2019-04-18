自定义菜单

```vue
<template>
  <v-editor v-model="content" :editorOptions="editorOptions"/>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      editorOptions: {
        menus: ['head', 'bold', 'image', 'table', 'code', 'undo', 'redo']
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
