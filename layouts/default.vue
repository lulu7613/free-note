<template>
  <div class="layout d-flex theme-dark">
    <Sidebar />
    <nuxt />
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar/index.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css); // 思源黑體

html {
  font-family: 'Source Sans Pro', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, "Noto Sans TC", Arial, sans-serif;
  // font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin: 0;
  // height: 100vh;
}

.layout {
  height: 100vh;
}
</style>
