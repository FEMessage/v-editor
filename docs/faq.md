## 在 TypeScript 中指定组件的类型

```html
<script lang="ts">
// 需要引入这个
// import { VEditorType } from '@femessage/v-editor'
export default {
  mounted() {
    (this.$refs.editor as VEditorType).height = 120
  },
}
</script>
```