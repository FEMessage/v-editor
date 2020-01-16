import {getSignature} from '.'

export class UploadAdapter {
  constructor(loader, options) {
    this.loader = loader
    this.options = options
  }

  async upload() {
    try {
      const file = await this.loader.file

      return await this.defaultRequest(file)
    } catch (error) {
      console.error(error)
    }
  }

  abort() {}

  defaultRequest(file) {
    const options = this.options
    const formData = new FormData()

    // ;['bucket', 'region', 'customDomain', 'dir']
    //   .filter(key => options[key])
    //   .forEach(key => formData.append(key, options[key]))

    formData.append('file', file)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'json'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve({
            default: xhr.response.payload.url
          })
        } else {
          reject(xhr.response)
        }
      }
      xhr.onerror = reject
      const timestamp = Date.now()
      const sep = options.uploadUrl.indexOf('?') > -1 ? '&' : '?'
      const url = `${options.uploadUrl}${sep}_=${timestamp}`
      xhr.open('POST', url, true)

      const signature = getSignature(location.origin, timestamp)
      xhr.setRequestHeader('x-upload-timestamp', timestamp)
      xhr.setRequestHeader('x-upload-signature', signature)

      xhr.send(formData)
    })
  }
}
