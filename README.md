# note-rich-text

> My cool Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 素材

* UI 設計: [設計師建良](https://challenge.thef2e.com/user/3?schedule=4279#works-4279)

* Icon 參考1: [Google](https://www.flaticon.com/authors/google) from [www.flaticon.com](https://www.flaticon.com/)

* Icon 參考2: [連結](https://drive.google.com/drive/folders/1b-IhXyFHWbsPmL1zehNEZZ1f9XELF2lb)


## Nuxt.js 相關

* 預處理器需另外載入，以 sass 為例：

```bash
$ yarn add --save-dev node-sass sass-loader
```

### Vuex

* 使用 modules 方式: 以功能( ex: todo.js、login.js )命名，放置 state、mutations、actions

* 也可拆成 actions.js、mutations.js、index.js

* state 必須使用 箭頭函式
```javascript
export const state = () => ({
  appTheme: 'night'
})
```

* 在本專案使用 return 獲取 state
```javascript
export default {
  // ...
  computed: {
    appTheme() {
      return this.$store.state.appTheme
    }
  }
}
```

* 獨立 actions.js、mutations.js、index.js，直接 export default
```javascript
// getters.js
export default {
  appTheme: state => state.appTheme
}
```

### 安裝第三方插件

* 方法1: 安裝插件，直接在頁面引用

* 方法2: 在 plugins/ 新增插件，在 nuxt.config.js 内配置 plugins


#### vue-quill-editor

```bash
$ yarn add vue-quill-editor
```
* [vue-quill-editor 官方 nuxt 安裝範例](https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-quill-editor/nuxt)

nuxt.config.js
```javascript
export default {
  css: [
    // 引用原始
    'quill/dist/quill.snow.css',
    'quill/dist/quill.core.css'
    // 修改 CSS 樣式: 複製 node_modules/quill/dist/quill.snow.css & quill.core.css
    '~assets/styles/quill/quill.snow.css',
    '~assets/styles/quill/quill.core.css',
  ],
  plugins: [
    // 官方
    { src: '~plugins/vue-quill-editor', ssr: false }
  ],
}
```

plugins/vue-quill-editor.js

```javascript
// 官方
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
```

元件

```html
<section class="quill-container">
  <client-only>
    <quill-editor
      ref="editor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
  </client-only>
</section>
```

```javascript
// 元件
export default {
  data() {
    return {
      content: '<h1>無標題</h1><p>請寫下內容</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              [{ 'font': [] }],                                  // 字型
              [{ 'size': ['small', false, 'large', 'huge'] }],   // 字體
              ['bold', 'italic', 'underline', 'strike'],         // 粗體 斜體 下底線 刪除線
              [{ 'align': [] }],                                 // 對齊
              ['blockquote', 'code-block'],                      // 引用 程式碼
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // 有序列表 無序列表
              [{ 'color': [] }, { 'background': [] }],           // 文字顏色 背景顏色
              ['link', 'image', video]                           // 連結 圖片 影片
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         // 標題大小
              [{ 'indent': '-1' }, { 'indent': '+1' }],          // 縮排
            ]
          }
        },
        theme: 'snow',  // 外觀主題 (snow / bubble)
        placeholder: 'Compose an epic...'
      },

      methods: {
        onEditorBlur(editor) {
          console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
          console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
          console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
          console.log('editor change!', editor, html, text)
          this.content = html
        }
      }
}
```

* 參考文章: [VueQuillEditor 如何添加自定义字体？](https://mouto.org/note/223)

在 plugins/vue-quill-editor 編輯要使用的字體

```javascript
  // ...
  Vue.use(VueQuillEditor)
  // 由此開始設定
  const fonts = ['思源黑體', 'Segoe']   // 要加入的字體
  const Font = VueQuillEditor.Quill.imports['formats/font']
  Font.whitelist = fonts; // 加入白名單
  VueQuillEditor.Quill.register(Font, true)
}
```

在元件內加入字體

```javascript
{
  modules: {
    toolbar: {
      // ...
      container: [
        [{ 'font': ['思源黑體', 'Segoe'] }],
      ],
      // ...
    }
  }
}
```

設定 CSS 樣式

```scss
// 自訂工具欄 font/字體
.ql-snow { 
  .ql-picker.ql-font{ 
    .ql-picker-label{ 
      &[data-value]::before { 
          content:attr(data-value); 
      } 
    } 
    .ql-picker-options{ 
      span[data-value]::before { 
          content:attr(data-value); 
      } 
    } 
  } 
}

.ql-font-思源黑體 { 
    font-family: "Noto Sans TC"; 
}
.ql-font-Segoe { 
    font-family: "Segoe UI"; 
}
```

* 上傳圖片並即時顯示

參考文章: [Nuxt中使用vue-quill-editor](https://www.twblogs.net/a/5cf7a8afbd9eee14644e2184)

參考文章: [FileReader by MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/FileReader)

參考文章: [image如何上传服务器并插入editor #51](https://github.com/surmon-china/vue-quill-editor/issues/51)

quill API: [getSelection()、insertEmbed()](https://quilljs.com/docs/api/#getselection)

元件

```html
  <client-only>
    <input
      type="file"
      style="display: none;"
      id="getFile"
      ref="getFile"
      @change="uploadFile($event)"
      accept="image/gif,image/jpeg,image/jpg,image/png"
    >
  </client-only>
```

```javascript
{
  data() {
    return {
      editor: null, // 存放 quill 實體
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            // ...
            handlers: {
              'image': function () {
                // 意思是使用插入圖片的功能時候，觸發文件上傳控件的點擊事件
                document.getElementById('getFile').click();
              }
            }
          }
        },
      }
    }
  },
  methods: {
    onEditorFocus(editor) {
      this.editor = editor
    },
    onEditorReady(editor) {
      this.editor = editor // 初始化
    },
    uploadFile(e) {

      const file = e.target.files[0];

      const data = new FormData();
      data.append('file-to-upload', file)
      // 可以使用post方法上傳文件到服務器
      // 然後把返回的路徑拼接好插入到內容裏
      // uploadFile(data).then(res => {
      //   this.content += `<img src="${res.imgUrl}" alt="內容圖片">`;
      // })

      // 即時顯示圖片
      // new FileReader() 
      const vm = this
      const rang = this.editor.getSelection() // 定位鼠標的位置，content 中的序列(index)
      const lang = rang.index
      const fr = new FileReader()
      fr.onload = function (e) {
        vm.editor.insertEmbed(lang, 'image', e.target.result) // 插入圖片
      }
      fr.readAsDataURL(file) // 存成 base64格式
    }
  }
}
```


#### 自訂 Vue 組件，處理 svg icon (插件 svg-sprite-loader)

```bash
$ yarn add svg-sprite-loader -D
```

* 參考文章：[Nuxt JS 使用 svg-sprite-loader 和 自定义 VUE组件 处理svg图标](https://zhuanlan.zhihu.com/p/75171152)

* 注意事項1: nuxt.config.js 需先定義 resolve() 和 path

* 注意事項2: resolve() 參數只需帶 dir

```javascript
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
```

#### lodash.js

```bash
$ yarn add lodash
```

* 透過 webpack 引入，[參考文章](https://nuxtjs.org/faq/webpack-plugins/)

```javascript
import webpack from 'webpack'

export default {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        '_': 'lodash'
      })
    ]
  }
}
```

* 透過 Vue 引入，並註冊在 vue 的 prototype 上，[參考文章](https://www.jianshu.com/p/47206a0fd073)

```javascript
//  plugins/lodash.js
import _ from 'lodash'
import Vue from 'vue'
Vue.prototype.$lodash = _

export default {
  plugins: [
    '@/plugins/lodash.js',
  ],
}
```

* 於元件內使用

```javascript
export default {
  created() {
    console.log(_.random(190, 200)) // 隨機產生 190 ~ 200 的數字
  },
}
```


## element-ui 相關

### 自訂主題：

* 額外創建 el-variable.scss，引入: 
```scss
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

* 在 nuxt.config.js 引入 el-variable.scss
```javascript
export default {
  // ...
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    { src: '~assets/styles/el-variables.scss', lang: 'scss' }
  ]
}
```


## json server

* Github: [json-server](https://github.com/typicode/json-server#getting-started)

* 參考文章: [使用 JSON Server 快速模擬 Restful API](https://andy6804tw.github.io/2018/02/01/json-server-intro/)

* 參考文章: [json-server常用自定义路由和简单配置](https://blog.csdn.net/weixin_40817115/article/details/81281454)

### 安裝注意事項:

1. 不是放在根目錄下，需加上目錄名稱

2. 如果運行 json-server 會報找不到 json-server 的話，在 package.json 新增

```json
{
  "scripts": {
    "mock": "json-server --c json/json-server.json json/db.json"
  },
}
// --c是 –config的缩写，意思是指定配置文件为json-server.json ，同时指定数据文件为db.json。
```


## 其他

### 引用思源黑體：
```scss
// layouts/default
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css); // 思源黑體

html {
  font-family: "Noto Sans TC";
}
```

### 關於介面切版 CSS 設定

* layout 分成 sidebar 和 nuxt 頁面顯示，使用 flex 切版

Sidebar.vue
``` css
.sidebar {
  min-width: 240px;
}
```

layout
```vue
<template>
  <div class="layout d-flex" :class="[`theme-${appTheme}`]">
    <Sidebar />
    <nuxt style="width: 100%" />
  </div>
</template>
```

* _id.vue (筆記本主體)

本來變數是用 scss 方式設定，但 calc() 取不到 scss 的變數，因此改使用 :root 設定。

```scss
.quill-container { // 父容器
  height: 100vh;
  overflow-y: hidden;
}

.ql-toolbar.ql-snow { // toolbar
  min-height: var(--toolbar-height);
  margin-bottom: var(--toolbar-mb);
}

.ql-container.ql-snow { // edit
  height: calc(100vh - var(--toolbar-height) - var(--toolbar-mb));
}
```

### Vue 的 transition-group

[Vue transition 文檔](https://cn.vuejs.org/v2/guide/transitions.html)

問題: 切換元素時，元素會同時進行 進入 & 離開 的過度動畫，造成版面跑掉。解決方法: 使用 mode="in-out / out-in"。但 transition-group 下 mode 無效果，[Issues](https://github.com/vuejs/vue/issues/3974)。

Issues 中有提解決方法: 

(元件必須使用 v-if 判斷顯示時機，不能使用 v-show)

```scss
// for mode out-in use the enter-active class
// for mode in-out use the leave-active class

.slide-enter-active, 
.slide-leave-active {
  transition: all .2s ease;
}

.slide-enter-active {
  display: none;
  transition-delay: .5s; // 可加上 delay
}

.slide-enter, 
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
```

### Vue 的 mixin

當多個組件的 Vue 設定(生命週期、data、methods...)相同時，可使用 mixin 共用。
此專案使用到的地方: components/NoteView 中的 Card.vue 和 List.vue

引入方式
```javascript
import config from './mixins/index.js'

export default {
  mixins: [config]
}
```