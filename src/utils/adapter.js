export class UploadAdapter {
  constructor(loader, options, uploadImg) {
    this.loader = loader
    this.options = options
    this.uploadImg = uploadImg
  }

  async upload() {
    const file = await this.loader.file
    return new Promise((resolve, reject) => {
      // 图片多选时会逐个调用此方法
      this.uploadImg(file)
        .then(url => {
          // 没有url意味着上传没有执行，需要reject
          if (url) {
            resolve({
              default: url
            })
          } else {
            reject()
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  abort() {}
}
