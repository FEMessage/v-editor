export class UploadAdapter {
  constructor(loader, options, uploadImg) {
    this.loader = loader
    this.options = options
    this.uploadImg = uploadImg
  }

  async upload() {
    try {
      // TODO: 检查是否多选
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
