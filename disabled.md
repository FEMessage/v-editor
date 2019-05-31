禁用

```vue
<template>
  <div>
    <v-editor v-model="content" :disabled="disabled" :height="height" />
    <button @click="disabled=!disabled">禁用:{{disabled}}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      height: 200,
      disabled: false
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
