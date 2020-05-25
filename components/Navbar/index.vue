<template>
  <div class="py-4 d-flex justify-content-between align-items-center">
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
    <notes-view />
  </div>
</template>

<script>
import NotesView from './components/NotesView.vue'

export default {
  components: {
    NotesView
  },

  data() {
    return {
      sortBy: 'desc',
    }
  },

  computed: {
    appTheme() {
      return this.$store.state.appTheme
    },
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

  .select {
    .el-input {
      width: 25rem;
    }

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