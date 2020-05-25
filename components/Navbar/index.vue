<template>
  <div class="py-4">
    <div>
      <el-select v-show="appMode === 'night'" class="select" popper-class="select-option" v-model="sortBy">
        <el-option label="依照時間(由新到舊)" value="desc" />
        <el-option label="依照時間(由舊到新)" value="asc" />
      </el-select>
      <el-select v-show="appMode === 'sunny'" class="select" v-model="sortBy">
        <el-option label="依照時間(由新到舊)" value="desc" />
        <el-option label="依照時間(由舊到新)" value="asc" />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: 'desc',
    }
  },

  computed: {
    appMode() {
      return this.$store.state.appMode
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