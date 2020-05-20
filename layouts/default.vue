<template>
  <div class="layout d-flex" :class="[`theme-${appMode}`]">
    <Sidebar />
    <nuxt style="width: 100%" />
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar/index.vue'

export default {
  components: {
    Sidebar
  },

  data() {
    return {
    }
  },

  watch: {
  },

  computed: {
    appMode() {
      return this.$store.state.appMode
    }
  },

  created() {
  },

  methods: {
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
