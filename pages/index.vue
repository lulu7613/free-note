<template>
  <div class="container">
    <Navbar/>
    <transition-group name="slide">
    <el-row v-if="notesViewType === 'card'" :gutter="20" key="card">
      <Card v-for="item in notesBySort" :key="item.id" :note-data="item" @actRedirect="actRedirect" />
    </el-row>
    <div v-else key="list">
      <List v-for="item in notesBySort" :key="item.id" :note-data="item" @actRedirect="actRedirect" />
    </div>
    </transition-group>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar/index.vue'
import Card from '~/components/NoteView/Card.vue'
import List from '~/components/NoteView/List.vue'
import config from '~/mixins/page.js'

export default {
  mixins: [config],

  computed: {
    NoteData() {
      return _.cloneDeep(this.$store.state.db.myAllNotes)
    },
  },

}
</script>

<style lang="scss" scope>
</style>
