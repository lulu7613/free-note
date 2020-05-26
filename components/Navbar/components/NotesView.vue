<template>
  <div>
    <svg-icon
      icon-class="view_list"
      class-name="icon text-gray cursor-pointer p-2 rounded"
      :class="[ isList ]"
      @click="actViewsType('list')" />
    <svg-icon
      icon-class="view_card"
      class-name="icon text-gray cursor-pointer p-2 rounded ml-1"
      :class="[ iscard ]"
      @click="actViewsType('card')" />
  </div>
</template>

<script>
import SvgIcon from '~/components/SvgIcon.vue'

export default {
  components: {
    SvgIcon
  },

  computed: {
    notesView() {
      return this.$store.state.notesView
    },
    isList() {
      return this.notesView === 'list' ? 'view-active' : 'notes-view'
    },
    iscard() {
      return this.notesView === 'card' ? 'view-active' : 'notes-view'
    }
  },

  methods: {
    actViewsType(type) {
      this.$store.commit('CHANGE_NOTES_VIEW', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/styles/variables.scss';

  $--icon-size: 18px;

  .icon {
    width: $--icon-size;
    height: $--icon-size;
  }

  .view-active {
    background-color: $--color-primary;
    color: white;
  }
</style>