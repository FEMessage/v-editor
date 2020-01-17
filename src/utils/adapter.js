export class UploadAdapter {
  constructor(loader, options, uploader) {
    this.loader = loader
    this.options = options
    this.uploader = uploader
  }

  async upload() {
    try {
      const file = await this.loader.file
      const url = await this.uploader.uploadRequest(file)

      return Promise.resolve({
        default: url
      })
    } catch (error) {
      console.error(error)
    }
  }

  abort() {}
}
