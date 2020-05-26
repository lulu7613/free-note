<template>
  <div class="container">
    <Navbar/>
    <transition-group name="slide">
    <el-row v-if="notesViewType === 'card'" :gutter="20" class="pt-4" :key="'card'">
      <Card v-for="item in myNotes" :key="item.id" :note-data="item" @actRedirect="actRedirect" />
    </el-row>
    <div v-else :key="'list'">
      <List v-for="item in myNotes" :key="item.id" :note-data="item" @actRedirect="actRedirect" />
    </div>
    </transition-group>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar/index.vue'
import Card from '~/components/Card/index.vue'
import List from '~/components/List/index.vue'

export default {
  components: {
    Navbar,
    Card,
    List
  },

  computed: {
    notesViewType() {
      return this.$store.state.notesView
    },
    myNotes() {
      return this.$store.state.db.myAllNotes
    }
  },

  mounted() {
    this.getAllNotes()
  },

  methods: {
    getAllNotes() {
      this.$store.dispatch('db/get_all_notes')
    },
    actRedirect(id) {
      console.log('I get Id!')
    },
  }
}
</script>

<style lang="scss" scope>
  .test {
    display: inline-block;
  }
</style>
