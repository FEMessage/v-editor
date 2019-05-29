自定义loading内容

```vue
<template>
  <v-editor v-model="content">
    <template slot="loading">hello imgs...</template>
  </v-editor>
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
