<template>
  <div class="container">
    <Navbar/>
    <transition name="slide">
    <el-row v-show="notesViewType === 'card'" :gutter="20" class="pt-4">
      <Card v-for="item in myNotes" :key="item.id" :note-data="item" @actRedirect="actRedirect" />
    </el-row>
    </transition>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar/index.vue'
import Card from '~/components/Card/index.vue'

export default {
  components: {
    Navbar,
    Card
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
</style>
