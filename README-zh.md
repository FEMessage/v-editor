# v-editor

[![Build Status](https://travis-ci.com/FEMessage/v-editor.svg?branch=master)](https://travis-ci.com/FEMessage/v-editor)
[![NPM Download](https://img.shields.io/npm/dm/@femessage/v-editor.svg)](https://www.npmjs.com/package/@femessage/v-editor)
[![NPM Version](https://img.shields.io/npm/v/@femessage/v-editor.svg)](https://www.npmjs.com/package/@femessage/v-editor)
[![NPM License](https://img.shields.io/npm/l/@femessage/v-editor.svg)](https://github.com/FEMessage/v-editor/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/v-editor/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

根据 [ckeditor5](https://github.com/ckeditor/ckeditor5) 以及 [upload-to-ali](https://github.com/femessage/upload-to-ali) 封装的轻量级富文本编辑器。

![view.png](https://i.loli.net/2020/01/20/qrKB9Jz7MemWFPR.png)

## Table of Contents <!-- omit in toc -->

* [Introduction](#introduction)
  * [组件大小](#组件大小)
  * [OSS 文件上传](#oss-文件上传)
* [Feature](#feature)
* [Demo](#demo)
* [Install](#install)
* [Quick start](#quick-start)
* [License](#license)
* [Contributors](#contributors)

## Introduction

因此选型富文本组件主要考虑：

### OSS 文件上传

配合 [upload-to-ai][upload-to-ali] 组件，富文本组件能自动将图片上传到 oss，避免图片信息以 base64 编码形式保存在内容中。

[⬆ Back to Top](#table-of-contents)

## Feature

* **oss 上传**：整合了上传组件，只需配置 OSS 的基本信息([配置参考][upload-to-ali])，即可将图片上传到 oss，支持截图粘贴上传

[⬆ Back to Top](#table-of-contents)

## Demo

* [doc and online demo](https://femessage.github.io/v-editor/)

[⬆ Back to Top](#table-of-contents)

## Install

```sh
# 上传图片功能依赖upload-to-ali组件
yarn add @femessage/upload-to-ali @femessage/v-editor
```

[⬆ Back to Top](#table-of-contents)

## Quick start

```vue
//step1 确保oss配置
//step2 在需要使用该渲染器的.vue文件中
<template>
  <v-editor v-model="content"/>
</template>
<script>
import VEditor from '@femessage/v-editor'
export default {
  components: {
    VEditor
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>
```

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/kunzhijia"><img src="https://avatars2.githubusercontent.com/u/4848041?v=4" width="100px;" alt="kunzhijia"/><br /><sub><b>kunzhijia</b></sub></a><br /><a href="https://github.com/FEMessage/v-editor/commits?author=kunzhijia" title="Code">💻</a> <a href="https://github.com/FEMessage/v-editor/issues?q=author%3Akunzhijia" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/v-editor/commits?author=kunzhijia" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/listars"><img src="https://avatars2.githubusercontent.com/u/20613509?v=4" width="100px;" alt="listars"/><br /><sub><b>listars</b></sub></a><br /><a href="https://github.com/FEMessage/v-editor/issues?q=author%3Alistars" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/v-editor/commits?author=listars" title="Documentation">📖</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/v-editor/issues?q=author%3Adonaldshen" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/v-editor/commits?author=donaldshen" title="Documentation">📖</a></td><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
