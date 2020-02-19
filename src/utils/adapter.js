export class UploadAdapter {
  constructor(loader, options, uploadImg) {
    this.loader = loader
    this.options = options
    this.uploadImg = uploadImg
  }

  async upload() {
    try {
      // 图片多选时会逐个调用此方法
      const file = await this.loader.file
      const url = await this.uploadImg(file)

      return {
        default: url
      }
    } catch (error) {
      console.error(error)
    }
  }

  abort() {}
}
