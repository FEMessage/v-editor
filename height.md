自定义编辑区高度

```vue
<template>
  <v-editor v-model="content" :height="height" />
</template>
<script>
export default {
  data() {
    return {
      content: '',
      height: 800
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
