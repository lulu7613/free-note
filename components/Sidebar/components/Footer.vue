<template>
  <div class="d-flex align-items-center justify-content-center">
    <span class="mr-3">模式</span>
    <svg-icon 
      icon-class="wb_sunny" 
      class-name="icon icon-circle-bg cursor-pointer"
      :class="{ 'bg-primary': isSunnyMode, 'bg-gray': !isSunnyMode }"
      @click="actMode('sunny')" />
    <svg-icon 
      icon-class="nights_stay" 
      class-name="icon icon-circle-bg cursor-pointer ml-2"
      :class="{ 'bg-primary': isNightMode, 'bg-gray': !isNightMode }"
      @click="actMode('night')" />
  </div>
</template>

<script>
import SvgIcon from '~/components/SvgIcon.vue'

export default {

  data() {
    return {

    }
  },
  created() {
  },

  computed: {
    appMode() {
      return this.$store.state.appMode
    },
    isNightMode() {
      return this.appMode === 'night' 
    },
    isSunnyMode() {
      return this.appMode === 'sunny'
    }
  },

  methods: {
    actMode(mode) {
      this.$store.commit('CHANGE_MODE', mode)
    }
  }
}
</script>

<style lang="scss" scoped>

.icon {
  width: 35px;
  height: 35px;
  color: white;
}

</style>