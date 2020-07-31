基本用法

```vue
<template>
  <div>
    <v-editor @ready="editor = $event" v-model="content" :on-upload-fail="onUploadFail" />
    <el-button @click="toggleInspector" style="margin-top: 5px">{{flag ? '关闭' : '打开'}}数据结构视图</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      editor: null,
      flag: false,
    }
  },
  watch: {
    content(val, oldVal) {
      //打印填写内容
      console.log(val)
    }
  },
  methods: {
    toggleInspector() {
      // TODO: 暂时没做到切换 demo 时自动关闭 inspector 的功能；已尝试 deactivated & beforeDestroy 钩子，未起效
      this.flag
        ? CKEditorInspector.destroy()
        : CKEditorInspector.attach({basic: this.editor})
      this.flag = !this.flag
    },
    onUploadFail() {
      alert('出于成本考虑，本demo没有部署上传服务，所以上传图片会失败')
    }
  },
}
</script>
```
