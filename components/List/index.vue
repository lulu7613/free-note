<template>
  <div class="list-box d-flex align-items-center cursor-pointer mb-4 rounded">
    <Svg-icon icon-class="star" class-name="icon text-gray cursor-pointer" @click.stop="actStar()" />
    <span class="text-gray ml-3">{{ noteData.id | returnDate }}</span>
    <h2 class="list-title text-center ml-3 my-3">我是標題，點我！</h2>
  </div>
</template>

<script>
import SvgIcon from '~/components/SvgIcon.vue'

export default {
  components: {
    SvgIcon
  },

  props: {
    noteData: {
      type: Object,
      default: null
    }
  },

  computed: {
  },

  filters: {
    returnDate(id) {
      function addZero(num) {
        return (num > 9 ? num : '0' + num)
      }
      const date = new Date(parseInt(id))
      const year = date.getFullYear()
      const month = addZero(date.getMonth())
      const day = addZero(date.getDay())

      return `${year}/${month}/${day}`
    }
  },

  methods: {
    actRedirect(id) {
      console.log('go to note!')
      this.$emit('actRedirect', id)
    },
    actStar() {
      console.log('add Star!')
    }
  }
}
</script>

<style lang="scss" scope>
  @import '~assets/styles/variables.scss';
  $--icon-width: 22px;

  .list-box {
    // max-width: 330px;
    height: 100px;
    padding: 12px;
    border: 2px solid transparent;
    box-shadow: 0 0 4px $--color-shadow;
    box-sizing: border-box;

    &:hover {
      border: 2px solid $--color-primary;
      transition: .3s all;
    }
  }

  .icon {
    width: $--icon-width;
    height: $--icon-width;
  }

  .list-title {
    font-size: 1.2rem;
  }
</style>
