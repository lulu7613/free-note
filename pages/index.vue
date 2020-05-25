<template>
  <div class="container">
    <Navbar/>
    <div class="py-4">123456</div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar/index.vue'

export default {
  components: {
    Navbar
  },

  computed: {
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
    }
  }
}
</script>

<style lang="scss">
</style>
