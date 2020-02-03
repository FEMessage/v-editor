const {VueLoaderPlugin} = require('vue-loader')
const {styles} = require('@ckeditor/ckeditor5-dev-utils')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const path = require('path')
const glob = require('glob')
const env = Object.assign({}, require('dotenv').config().parsed, {
  UPLOAD_ACTION: process.env.UPLOAD_ACTION,
  OSS_BUCKET: process.env.OSS_BUCKET,
  OSS_REGION: process.env.OSS_REGION
})

const demos = glob.sync('docs/!(basic).md')
const demoSections = [
  {
    name: 'basic',
    content: 'docs/basic.md'
  }
].concat(
  demos.map(filePath => ({
    name: path.basename(filePath, '.md'),
    content: filePath
  }))
)

module.exports = {
  styleguideDir: 'docs',
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/FEMessage/v-editor'
  },
  require: ['./styleguide/element.js', './styleguide/upload-to-ali.js'],
  sections: [
    {
      name: 'Components',
      components: 'src/*.vue',
      usageMode: 'expand'
    },
    {
      name: 'Demo',
      sections: demoSections,
      sectionDepth: 2
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag'
              }
            },
            {
              loader: 'postcss-loader',
              options: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                },
                minify: true
              })
            }
          ]
        },
        {
          test: /\.svg$/,
          use: ['raw-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          loaders: ['vue-style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(woff2?|eot|[ot]tf)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new CKEditorWebpackPlugin({
        language: 'zh-cn',
        additionalLanguages: 'all'
      }),
      new (require('webpack')).DefinePlugin({
        'process.env': JSON.stringify(env)
      })
    ]
  }
}
