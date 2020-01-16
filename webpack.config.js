const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const {bundler, styles} = require('@ckeditor/ckeditor5-dev-utils')
const {VueLoaderPlugin} = require('vue-loader')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: [
    require.resolve('regenerator-runtime/runtime.js'),
    path.resolve(__dirname, 'src', 'index.js')
  ],
  output: {
    library: 'VEditor',
    path: path.resolve(__dirname, 'dist'),
    filename: 'v-editor.umd.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
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
  module: {
    rules: [
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      },
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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
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
