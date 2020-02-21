自定义编辑区（不包括 toolbar）高度，height 支持传 css 长度和 Number 类型（默认单位 px）

```vue
<template>
  <div>
    <v-editor v-model="content" height="200" />
    <v-editor v-model="content2" height="10em" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      content2: '',
    }
  },
}
</script>
```
