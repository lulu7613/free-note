<template>
  <div class="sidebar">
    <h3 
      class="text-center text-primary pt-4"
      style="font-size: 25px;"
    >
      FreeNote.
    </h3>

    <div class="mt-5">
      <div 
        class="mb-4 mx-4 py-3 bg-primary rounded d-flex align-items-center justify-content-center cursor-pointer" 
        style="color: white"
      >
        <svg-icon icon-class="add" class-name="icon icon-circle" />
        <span class="ml-2" @click="createNewNote">建立筆記</span>
      </div>
      <ul class="mx-4">
        <li 
          v-for="(item, k) in sidebarList" 
          :key="k" 
          class="sidebar-type-hover d-flex rounded cursor-pointer mt-2 py-2 pl-4">
          <svg-icon :icon-class="item.icon" class-name="icon mr-3" />
          <nuxt-link :to="item.link" class="box-size-border">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </div>

    <Footer class="footer box-size-border" />
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
        { title: '所有筆記', icon: 'file', link: '/' },
        { title: '已加星號', icon: 'star', link: '/stars' },
        { title: '垃圾桶', icon: 'delete', link: '/delete' }
      ]
    }
  },

  created() {
  },

  methods: {
    createNewNote() {
      const id = _.now()
      this.$router.push({ path: `/note/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables.scss";
$sidebar-width: 240px;

.sidebar {
  min-width: $sidebar-width;
  box-shadow: 0px 0px 4px $--color-shadow;
  overflow: auto;
  position: relative;
}

  // 設定 list 列表的 border，避免 hover 造成位移現象
  li a  {
    border: 1px solid transparent;
  }

.footer {
  position: absolute;
  bottom: 10%;
  width: $sidebar-width;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
