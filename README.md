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
  appMode: 'night'
})
```

* 在本專案使用 return 獲取 state
```javascript
export default {
  // ...
  computed: {
    appMode() {
      return this.$store.state.appMode
    }
  }
}
```

* 獨立 actions.js、mutations.js、index.js，直接 export default
```javascript
// getters.js
export default {
  appMode: state => state.appMode
}
```

### 安裝第三方插件

* 方法1: 安裝插件，直接在頁面引用

* 方法2: 在 plugins/ 新增插件，在 nuxt.config.js 内配置 plugins


#### vue-quill-editor

```bash
$ yarn add vue-quill-editor
```

* 參考文章: [vue-quill-editor 在nuxt中使用](https://www.jianshu.com/p/dcd2aac870b8)

```javascript
// nuxt.config.js
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
    '@/plugins/nuxt-quill-plugin'
  ],
}
```

```html
<!-- 元件 -->
 <div class="quill-container">
      <div
        :content="content"
        v-quill:myQuillEditor="editorOption"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      >
        <div class="output ql-bubble">
          <div v-html="content"></div>
        </div>
      </div>
    </div>
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
            ],
            handlers: {
              'image': function () {
                // 意思是使用插入图片的功能时候，触发文件上传控件的点击事件
                document.getElementById('getFile').click();
              }
            }
          }
        },
        theme: 'snow',                      // 外觀主題 (snow / bubble)
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
import Vue from 'vue'

if (process.browser) {
  // ...
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


## 其他

### 引用思源黑體：
```scss
// layouts/default
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css); // 思源黑體

html {
  font-family: "Noto Sans TC";
}
```