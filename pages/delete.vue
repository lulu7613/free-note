<template>
  <div class="container">
    <Navbar/>
    <transition-group name="slide">
    <el-row v-if="notesViewType === 'card'" :gutter="20" key="card">
      <Card v-for="item in notesBySort" :key="item.id" :note-data="item" @actRedirect="actRedirect">
        <slot>
          <div class="d-flex">
            <el-link type="primary" icon="el-icon-refresh-right" class="mr-3" @click.stop="actRecovery(item)">復原</el-link>
            <el-link type="danger" icon="el-icon-delete" @click.stop="actDeleteNote(item.id)">刪除</el-link>
          </div>
        </slot>
      </Card>
    </el-row>
    <div v-else key="list">
      <List v-for="item in notesBySort" :key="item.id" :note-data="item" @actRedirect="actRedirect">
        <slot>
          <div class="d-flex" style="min-width: 110px">
            <el-link type="primary" icon="el-icon-refresh-right" class="mr-3" @click.stop="actRecovery(item)">復原</el-link>
            <el-link type="danger" icon="el-icon-delete" @click.stop="actDeleteNote(item.id)">刪除</el-link>
          </div>
        </slot>
      </List>
    </div>
    <div v-show="notesBySort.length === 0" key="noData">
      垃圾桶空空的 d(`･∀･)b
    </div>
    </transition-group>
  </div>
</template>

<script>
import config from '~/mixins/page.js'
import { update_note, delete_note } from '~/api/db.js'

export default {
  mixins: [config],

  computed: {
    NoteData() {
      const data = _.cloneDeep(this.$store.state.db.myAllNotes)
      if (!data) return
      return data.filter(i => i.isDelete)
    }
  },

  methods: {
    async actRecovery(item) {
      item.isDelete = false
      await update_note(item)
      this.$store.dispatch('db/get_all_notes')
    },
    async actDeleteNote(id) {
      await delete_note(id)
      this.$store.dispatch('db/get_all_notes')
    }
  }
}
</script>

<style lang="scss" scope>
</style>
