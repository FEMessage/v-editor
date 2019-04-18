基本用法

```vue
<template>
  <div>
    <v-editor v-model="content"/>
    <input v-model="content"/>
  </div>
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
