覆盖默认的上传行为，可以自定义上传的实现

```vue
<template>
  <v-editor ref="e" v-model="content" :upload-options="uploadOptions" />
</template>

<script>
export default {
  data() {
    return {
      content: '',
      uploadOptions: {
        beforeUpload: () => console.log('onBefore'),
        httpRequest: this.myUpload,
        tip: 'refliued'
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
    }
  }
}
</script>
```