自动保存

Autosave

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
