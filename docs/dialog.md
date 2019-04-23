弹窗例子

```vue
<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">点击打开 Dialog</el-button>
    <input v-model="content"/>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <v-editor v-model="content"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'fasdfasf',
      dialogFormVisible: false
    }
  },
  watch: {
    content(val, oldVal) {
      //打印填写内容
      console.log(val)
    }
  }
}
</script>
```