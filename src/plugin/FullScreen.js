// 基础功能组件
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
// 按钮视图组件
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

// 按钮的图标 SVG
import maxIcon from '../assets/maximize.svg'
import minIcon from '../assets/minimize.svg'

// 自定义组件需要继承基础组件
export default class FullScreen extends Plugin {
  // 重写基础组件的初始化函数
  init() {
    const {editor} = this
    // 将自定义按钮添加到当前编辑器的组件工厂
    editor.ui.componentFactory.add('fullScreen', locale => {
      // 获取当前编辑器的按钮视图
      const view = new ButtonView(locale)

      // 在按钮视图中注入自定义按钮的名称、图标
      view.set({
        label: '切换全屏',
        icon: maxIcon,
        // 开启提示，当鼠标悬浮到按钮上，会显示 label 指定的 fullscreen 字样
        tooltip: true
      })

      // 点击按钮
      view.on('execute', e => {
        e.source.icon = editor.ui.view.element.classList.contains('full-screen')
          ? maxIcon
          : minIcon
        // ckeditor 是挂载在传入 dom 后面的，有意思
        editor.ui.view.element.classList.toggle('full-screen')
      })

      // 返回修改后的视图内容
      return view
    })
  }
}
