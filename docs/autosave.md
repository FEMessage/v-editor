如果 1 秒内没有任何操作，会触发自动保存

It will autosave if no any operation in 1s

```vue
<template>
  <v-editor v-model="content" @autosave="handleSave" :autosave="1000"/>
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
