设置自适应内容高度

```vue
<template>
  <div>
    autosize: {{autosize}}
    <v-editor v-model="content" :autosize="autosize"/>
    <el-button @click="autosize.maxRows++">增加maxRows</el-button>
    <el-button @click="autosize.minRows++">增加minRows</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      autosize:{
        maxRows:5,
        minRows:3
      }
    }
  },
}
</script>
```
