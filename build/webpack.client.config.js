const webpack = require('webpack')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = Object.assign({}, base, {
  resolve: {
    alias: Object.assign({}, base.resolve.alias, {
      'create-api': './create-api-client.js'
    })
  },
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // 为了更好的缓存第三方库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 自动生成输出 HTML
    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  // 使用 ExtractTextPlugin 提取 CSS 成一个单独的文件,使它适用于首次渲染
  // 通过 LoaderOptionsPlugin 插件， vueConfig 已经包含在这个配置中
  // 这里我们为 <style lang="stylus"> 重写配置,方便被提取
  vueConfig.loaders = {
    stylus: ExtractTextPlugin.extract({
      loader: 'css-loader!stylus-loader',
      fallbackLoader: 'vue-style-loader' // <- 这是 vue-loader 的一个依赖
    })
  }

  config.plugins.push(
    new ExtractTextPlugin('styles.[hash].css'),
    // 压缩 CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // 压缩 JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 开启 Service Worker 预缓存剩下路由
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = config
