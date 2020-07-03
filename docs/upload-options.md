覆盖默认的上传行为，可以自定义上传的实现

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

设置upload-to-ali的大小限制，兼容overSize等事件

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
        request: this.myUpload,
        size: 100,
        onOversize: () => this.$message.warning('请选择100K以内的图片')
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
