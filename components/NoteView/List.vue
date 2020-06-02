<template>
  <div class="list-box d-flex align-items-center cursor-pointer mb-4 rounded" @click="actRedirect(data.id)">
    <div @click.stop="actStar()">
      <Svg-icon v-show="data.isStar" icon-class="star" class-name="icon text-primary cursor-pointer" />
      <Svg-icon v-show="!data.isStar" icon-class="star" class-name="icon text-gray cursor-pointer" />
    </div>
    <span class="text-gray ml-3">{{ noteData.id | returnDate }}</span>
    <h2 class="list-title text-center ml-3 my-3">{{ data.content[0].insert }}</h2>
  </div>
</template>

<script>
import config from './mixins/index.js'

export default {
  mixins:[config]
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
