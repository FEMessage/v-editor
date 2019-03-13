import {storiesOf} from '@storybook/vue'
import VEditor from '../src/v-editor'
import {Dialog, Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
storiesOf('v-editor', module)
  .add('基础用法', () => ({
    template: `<div><v-editor v-model="content"/><input v-model="content"/></div>`,
    components: {
      VEditor
    },
    data: () => {
      return {
        content: ''
      }
    },
    watch: {
      content(val, oldVal) {
        //打印填写内容
        console.log(val)
      }
    }
  }))
  .add('自定义loading内容', () => ({
    template: `<v-editor v-model="content"><template slot="loading">hello imgs...</template></v-editor>`,
    components: {
      VEditor
    },
    data: () => {
      return {
        content: ''
      }
    },
    watch: {
      content(val, oldVal) {
        //打印填写内容
        console.log(val)
      }
    }
  }))
  .add('自定义编辑区高度', () => ({
    template: `<v-editor v-model="content" :height="height"></v-editor>`,
    components: {
      VEditor
    },
    data: () => {
      return {
        content: '',
        height: 800
      }
    },
    watch: {
      content(val, oldVal) {
        //打印填写内容
        console.log(val)
      }
    }
  }))
  .add('with disabled', () => ({
    template: `<div><v-editor v-model="content" :disabled="disabled" :height="height"></v-editor><div> <button @click="disabled=!disabled">禁用:{{disabled}}</button></div></div>`,
    components: {
      VEditor
    },
    data: () => {
      return {
        content: '',
        height: 200,
        disabled: false
      }
    },
    watch: {
      content(val, oldVal) {
        //打印填写内容
        console.log(val)
      }
    }
  }))
  .add('弹窗例子', () => ({
    template: `<div>
      <el-button type="text" @click="dialogFormVisible = true">点击打开 Dialog</el-button>
      <input v-model="content"/>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <v-editor v-model="content"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
      </el-dialog>
    </div>`,
    components: {
      VEditor,
      'el-button': Button,
      'el-dialog': Dialog
    },
    data: () => {
      return {
        content: 'fasdfasf',
        dialogFormVisible: false
      }
    },
    watch: {
      content(val, oldVal) {
        //打印填写内容
        console.log(val)
      }
    }
  }))
  .add('自定义菜单栏', () => ({
    template: `<v-editor v-model="content" :editorOptions="editorOptions"/>`,
    components: {
      VEditor
    },
    data: () => {
      return {
        content: '',
        editorOptions: {
          menus: ['head', 'bold', 'image', 'table', 'code', 'undo', 'redo']
        }
      }
    },
    watch: {
      content(val, oldVal) {
        //打印填写内容
        console.log(val)
      }
    }
  }))
