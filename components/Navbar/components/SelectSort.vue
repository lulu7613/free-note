<template>
  <div>
    <el-select v-show="appTheme === 'night'" class="select" popper-class="select-option" v-model="sortBy">
      <el-option label="依照時間(由新到舊)" value="desc" />
      <el-option label="依照時間(由舊到新)" value="asc" />
    </el-select>
    <el-select v-show="appTheme === 'sunny'" class="select" v-model="sortBy">
      <el-option label="依照時間(由新到舊)" value="desc" />
      <el-option label="依照時間(由舊到新)" value="asc" />
    </el-select>
  </div>
</template>

<script>
export default {

  computed: {
    appTheme() {
      return this.$store.state.appTheme
    },
    sortBy: {
      get() {
        return this.$store.state.notesSort
      },
      set(type) {
        return this.$store.commit('CHANGE_NOTES_SORT', type)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

  .select {
    .el-input--suffix .el-input__inner {
      border: 0;
      font-family: inherit;
    }
  }

  .select-option {
    .el-scrollbar {
      background-color: $--color-dark;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
      background-color: $--color-black;
    }
  }
</style>