自定义编辑区（不包括 toolbar）高度，height 支持传 css 长度，和 Number 类型（默认单位 px）

```vue
<template>
  <v-editor class="demo" v-model="content" height="200" />
</template>
<script>
export default {
  data() {
    return {
      content: '',
    }
  },
}
</script>
```
