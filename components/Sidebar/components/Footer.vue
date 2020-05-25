<template>
  <div class="d-flex align-items-center justify-content-center">
    <span class="mr-4">模式</span>
    <svg-icon 
      icon-class="wb_sunny" 
      class-name="icon icon-circle-bg cursor-pointer"
      :class="{ 'bg-primary': isSunnyMode, 'bg-gray': !isSunnyMode }"
      @click="actMode('sunny')" />
    <svg-icon 
      icon-class="nights_stay" 
      class-name="icon icon-circle-bg cursor-pointer ml-3"
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
    appTheme() {
      return this.$store.state.appTheme
    },
    isNightMode() {
      return this.appTheme === 'night' 
    },
    isSunnyMode() {
      return this.appTheme === 'sunny'
    }
  },

  methods: {
    actMode(mode) {
      this.$store.commit('CHANGE_APP_THEME', mode)
    }
  }
}
</script>

<style lang="scss" scoped>

.icon {
  width: 25px;
  height: 25px;
  color: white;
}

</style>