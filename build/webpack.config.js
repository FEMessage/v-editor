const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const {bundler, styles} = require('@ckeditor/ckeditor5-dev-utils')
const {VueLoaderPlugin} = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    require.resolve('regenerator-runtime/runtime.js'),
    path.resolve('src', 'index.js')
  ],
  output: {
    library: 'VEditor',
    path: path.resolve('dist'),
    filename: 'v-editor.umd.js',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /^!/
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    new CKEditorWebpackPlugin({
      language: 'zh-cn'
    }),
    new webpack.BannerPlugin({
      banner: bundler.getLicenseBanner(),
      raw: true
    }),
    new VueLoaderPlugin()
  ],
  externals: ['@femessage/upload-to-ali'],
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
      }
    ]
  }
}
