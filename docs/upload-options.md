覆盖默认的上传行为，可以自定义上传的实现
注意beforeUpload等上传流程外的事件可能不生效

```vue
<template>
  <v-editor ref="e" v-model="content" :upload-options="uploadOptions"  @upload-start="uploadStart" @upload-end="uploadEnd"  />
</template>

<script>
export default {
  data() {
    return {
      content: '',
      uploadOptions: {
        request: this.myUpload
      }
    }
  },
  methods: {
    myUpload(file) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('\/\/deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/logo_Deepexi_640x640.jpg')
        }, 2000)
      })
    },
    uploadStart(){
      console.log('start')
    },
    uploadEnd(status, res){
      console.log('end', status, res)
    }
  }
}
</script>
```
