<template>
  <el-col :sm="20" :md="12" :lg="8" class="mb-4">
    <div class="cart-box cursor-pointer rounded" @click="actRedirect()">
      <div class="cart-img rounded">
        <img src="~/static/images/notebook.jpg" alt="我的筆記">
      </div>
      <h2 class="cart-title text-center my-3">我是標題，點我！</h2>
      <div class="cart-content d-flex justify-content-center align-items-center">
        <Svg-icon icon-class="star" class-name="icon text-gray cursor-pointer" @click.stop="actStar()" />
        <span class="cart-date text-gray ml-3">{{ noteData.id }}</span>
      </div>
    </div>
  </el-col>
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
      
    }
  },

  mounted() {
  },

  methods: {
    actRedirect() {
      console.log('go to note!')
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

  .cart-box {
    // width: 330px;
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
