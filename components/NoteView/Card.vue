<template>
  <el-col :sm="20" :md="12" :lg="8" class="mb-4">
    <div class="cart-box cursor-pointer rounded" @click="actRedirect(data.id)">
      <div class="cart-img rounded">
        <img src="~/static/images/notebook.jpg" alt="我的筆記">
      </div>
      <h2 class="cart-title text-center my-3">{{ data.content[0].insert }}</h2>
      <div class="cart-content d-flex justify-content-between align-items-center">
        <slot>
          <div class="d-flex">
            <div class="mr-1" @click.stop="actStar()">
              <Svg-icon v-show="data.isStar" icon-class="star" class-name="icon text-primary cursor-pointer" />
              <Svg-icon v-show="!data.isStar" icon-class="star" class-name="icon text-gray cursor-pointer" />
            </div>
            <div class="delete-hover" @click.stop="actAddDeletePage()">
              <Svg-icon icon-class="delete" class-name="icon-delete text-danger cursor-pointer" />
            </div>
          </div>
        </slot>
        <span class="cart-date text-gray ml-3">{{ data.id | returnDate }}</span>
      </div>
    </div>
  </el-col>
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
  $--icon-delete-width: 27px;

  .cart-box {
    // max-width: 330px;
    height: 245px;
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

  .icon-delete {
    width: $--icon-delete-width;
    height: $--icon-delete-width;
    opacity: .2;
  }

  .delete-hover:hover {
    .icon-delete {
      opacity: 1;
    }
  }

  .cart-img {
    height: 120px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .cart-title {
    font-size: 1.4rem;
  }
</style>
