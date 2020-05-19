基本用法

```vue
<template>
  <div>
    <v-editor v-model="content" :placeholder="placeholder"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      placeholder: "欢迎使用 v-editor"
    }
  }
}
</script>
```
