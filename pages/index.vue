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
    <div v-show="notesBySort.length === 0" key="noData">
      還沒有筆記哦，趕快紀錄屬於自己的回憶吧~ (つ´ω`)つ
    </div>
    </transition-group>
  </div>
</template>

<script>
import config from '~/mixins/page.js'

export default {
  mixins: [config],

  computed: {
    NoteData() {
      const data = _.cloneDeep(this.$store.state.db.myAllNotes)
      if (!data) return
      return data.filter(i => !i.isDelete )
    },
  },

}
</script>

<style lang="scss" scope>
</style>
