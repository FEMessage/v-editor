如果 8 秒内没有任何操作，会触发自动保存

It will autosave if no any operation in 8s

```vue
<template>
  <v-editor v-model="content" @autosave="handleSave" />
</template>
<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    handleSave(value) {
      console.log(value)
    }
  }
}
</script>
```
