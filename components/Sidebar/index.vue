<template>
  <div class="sidebar">
    <h3 
      class="text-center text-primary pt-4"
      style="font-size: 25px;"
    >
      FreeNote.
    </h3>

    <div class="mt-5">
      <div class="mb-4 mx-4 py-3 bg-primary rounded d-flex align-items-center justify-content-center cursor-pointer" @click="act('建立筆記')">
        <svg-icon icon-class="add" class-name="icon icon-circle" />
        <span class="ml-2" style="font-size: 1.1rem">建立筆記</span>
      </div>
      <ul class="mx-4">
        <li v-for="(item, k) in sidebarList" :key="k" class="sidebar-type-hover rounded cursor-pointer mt-1 py-2 pl-4" @click="act(item.title)">
          <svg-icon :icon-class="item.icon" class-name="icon mr-2" />
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>

    <Footer class="footer" />
  </div>
</template>

<script>
import SvgIcon from '~/components/SvgIcon.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    SvgIcon,
    Footer
  },

  data() {
    return {
      sidebarList: [  
        // { title: '建立筆記', icon: 'add' },
        { title: '所有筆記', icon: 'file' },
        { title: '已加星號', icon: 'star' },
        { title: '垃圾桶', icon: 'delete' }
      ]
    }
  },

  created() {
  },

  methods: {
    act(title) {
      console.log(title)
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/variables.scss";
$sider-width: 240px;

.sidebar {
  width: $sider-width;
  box-shadow: 0px 0px 4px $--color-shadow;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 10%;
  width: $sider-width;
  box-sizing: border-box;
}

.icon {
  width: 22px;
  height: 22px;
}
</style>
