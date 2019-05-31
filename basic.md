基本用法

```vue
<template>
  <v-editor v-model="content" />
</template>
<script>
export default {
  data() {
    return {
      content: ''
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
