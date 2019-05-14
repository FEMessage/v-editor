自定义menu的颜色

```vue
<template>
  <div>
    <v-editor v-bind="menuStyle" v-model="content"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuStyle: {
        menuBackgroundColor: 'green',
        menuItemColor: 'yellow',
        menuItemHoverColor: 'blue',
      },
      content: ''
    }
  },
}
</script>
```
