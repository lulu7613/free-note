<template>
  <div class="sidebar">
    <h3 
      class="text-center text-primary"
      style="font-size: 25px;"
    >
      FreeNote.
    </h3>
    <ul class="sidebar-list mt-5 mx-3">
      <li v-for="(item, k) in sidebarList" :key="k" class="rounded-pill text-center mt-1" @click="act(item.title)">
        
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { sidebarList } from '~/utils/data.js'

export default {
  data() {
    return {
      sidebarList: sidebarList
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

.sidebar {
  width: 240px;
  box-shadow: 0px 0px 4px $--color-shadow;
}

.sidebar-list {
  li {
    padding: 1rem 0;
    cursor: pointer;

    &:hover {
      background-color: $--color-primary;
    }
  }
}
</style>
