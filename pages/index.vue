<template>
  <div class="container">
    <Navbar/>
    <el-row :gutter="20" class="pt-4">
      <Card v-for="item in myNotes" :key="item.id" :note-data="item" />
    </el-row>
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

<style lang="scss" scope>
</style>
