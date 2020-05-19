import Vue from 'vue'

if (process.browser) {
// 加一个浏览器端判断，只在浏览器端才渲染就不会报错了
  const VueQuillEditor = require('vue-quill-editor/dist/ssr')
  Vue.use(VueQuillEditor)

  const fonts = ['思源黑體', 'Segoe']
  const Font = VueQuillEditor.Quill.imports['formats/font']
  Font.whitelist = fonts; 
  VueQuillEditor.Quill.register(Font, true)
}