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

### 自訂 Vue 組件，處理 svg icon

* 插件: svg-sprite-loader

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