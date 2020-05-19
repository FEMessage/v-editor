import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import marked from 'marked'
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor'

export default class TransformMD extends Plugin {
  afterInit() {
    const editor = this.editor
    const model = editor.model
    const view = editor.editing.view
    const viewDocument = view.document
    // 把富文本转成编辑器看得懂的内容
    const dataProcessor = new HtmlDataProcessor(viewDocument)

    //等同 addEventListener
    this.listenTo(viewDocument, 'clipboardInput', (event, data) => {
      const dataTransfer = data.dataTransfer
      // 1 | - | * | # | ![] | []()
      const regex = /[-*1#]{1,6}\s+|!?\[\S*\][\s*|(\S*)].*?[-*1#]?/g
      let text = dataTransfer.getData('text/plain')

      // 确认是 markdown 应该八九不离十
      if (regex.test(text)) {
        let content = marked(text, {
          breaks: true
        })
        content = dataProcessor.toView(content)

        if (!content.isEmpty) {
          const dataController = this.editor.data
          const modelFragment = dataController.toModel(
            content,
            '$clipboardHolder'
          )

          model.insertContent(modelFragment)
        }
        view.scrollToTheSelection()
        // 终止事件，不会继续往下传；
        // 如果不满足，也就是 event 放行，即会接下去的监听事件继续工作
        event.stop()
      }
    })
  }
}
