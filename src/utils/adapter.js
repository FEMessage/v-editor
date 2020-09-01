export class UploadAdapter {
  constructor(loader, uploadFunc) {
    this.loader = loader
    this.uploadFunc = uploadFunc
  }

  /**
   *
   * @param {string} fileMIMEType mime-type
   * see: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
  async upload(fileMIMEType) {
    try {
      const file = await this.loader.file
      // 图片多选时会逐个调用此方法
      const url = await this.uploadFunc(file, fileMIMEType)
      // 没有url意味着上传没有执行，需要reject
      if (url) {
        return {default: url}
      } else {
        return Promise.reject(url)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  abort() {}
}
