import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Command from '@ckeditor/ckeditor5-core/src/command'
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview'

import attachmentIcon from '../assets/attachment.svg'
import hooks from '../utils/hooks'

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
        hooks.invoke('toggle-spinner', true)
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
      /** @type {import ('ckeditor__ckeditor5-engine').model.Range} */
      let filenameTxtPlaceholderRange

      // 执行顺序依次：读取，占位，上传
      loader
        .read()
        .then(() => {
          const filenameTxtModel = writer.createText(`{{${file.name}}}`)
          filenameTxtPlaceholderRange = model.insertContent(
            filenameTxtModel,
            model.document.selection
          )
        })
        .then(() => loader.upload())
        .then(data => {
          const url = data.default

          // 上传完成 - 去除 spinner - wrapper
          // 小文件一闪不好看，大文件也不纠结这500ms
          setTimeout(() => {
            hooks.invoke('toggle-spinner', false)
          }, 500)

          // 插入文本
          const blank = writer.createText(' ')
          /**
           * 没法在 link 里插入 svg 图片
           * https://ckeditor.com/docs/ckeditor5/latest/builds/guides/faq.html#where-are-the-editorinserthtml-and-editorinserttext-methods-how-to-insert-some-content
           */
          // const viewFragment = editor.data.processor.toView(attachmentIcon)
          // const modelFragment = editor.data.toModel(viewFragment)
          // console.log(modelFragment) // 空。得写插件支持
          /**
           * 只能 emoji 了
           * 备选：🔗📂📚📦
           */
          const linkText = writer.createText(`🔗${file.name}`, {linkHref: url})

          model.insertContent(linkText, model.document.selection)
          model.insertContent(blank, model.document.selection)
          editor.execute('enter')

          if (filenameTxtPlaceholderRange) {
            const selection = writer.createSelection(
              filenameTxtPlaceholderRange
            )
            model.deleteContent(selection)
          }

          // 回收 loader
          fileRepository.destroyLoader(loader)
        })
    })
  }
}
