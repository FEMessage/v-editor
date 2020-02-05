import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Command from '@ckeditor/ckeditor5-core/src/command'
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview'

import attachmentIcon from '../assets/attachment.svg'

export default class AttachmentUpload extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'AttachmentUpload'
  }

  init() {
    const {editor} = this

    // 注册命令
    editor.commands.add('attachmentUpload', new AttachmentCommand(editor))

    editor.ui.componentFactory.add('AttachmentUpload', locale => {
      // 文件选择器类型按钮
      const view = new FileDialogButtonView(locale)

      view.buttonView.set({
        label: '附件上传',
        icon: attachmentIcon,
        tooltip: true
      })

      // 文件选择结束回调
      view.on('done', (_, file) => {
        editor.execute('attachmentUpload', {file})
      })

      return view
    })
  }
}

class AttachmentCommand extends Command {
  execute(options) {
    const {editor} = this
    const model = editor.model
    const fileRepository = editor.plugins.get('FileRepository')

    // 被调用命令时传入文件
    const file = options.file[0]

    model.change(writer => {
      const loader = fileRepository.createLoader(file)

      // 执行顺序依次：读取，上传
      loader
        .read()
        .then(() => loader.upload())
        .then(data => {
          const url = data.default

          // 插入文本
          const blank = writer.createText(' ')
          const linkText = writer.createText(file.name, {linkHref: url})

          model.insertContent(linkText, model.document.selection)
          model.insertContent(blank, model.document.selection)
          editor.execute('enter')

          // 回收 loader
          fileRepository.destroyLoader(loader)
        })
    })
  }
}
