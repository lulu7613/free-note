const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

import webpack from 'webpack'

export default {
  mode: 'spa', // 更改模式 universal or spa
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#84A5FF' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/bootstrap.css',
    { src: '~assets/styles/index.scss', lang: 'scss' },
    '~assets/styles/quill/quill.snow.css', // 複製 node_modules/quill/dist/
    '~assets/styles/quill/quill.core.css', // 複製 node_modules/quill/dist/
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/svg-icon',
    { src: '~plugins/vue-quill-editor', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // 排除 nuxt 原配置的影响, Nuxt 默认有 vue-loader, 会处理 svg, img 等
      // 找到匹配 .svg的规则, 然后将存放 svg 文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [resolve('assets/icons/svg')]

      //添加 loader 规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [resolve('assets/icons/svg')], // 将存放 svg 的目录加入到loader处理目录
        use: [{ loader: 'svg-sprite-loader', options: {symbolId: 'icon-[name]'}}]
      })
    },
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        '_': 'lodash'
      })
    ]
  }
}
