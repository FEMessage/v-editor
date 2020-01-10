const {VueLoaderPlugin} = require('vue-loader')
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
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.styl(us)?$/,
          loaders: ['vue-style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.(woff2?|eot|[ot]tf)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new (require('webpack')).DefinePlugin({
        'process.env': JSON.stringify(env)
      })
    ]
  }
}
