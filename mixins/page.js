import Navbar from '~/components/Navbar/index.vue'
import Card from '~/components/NoteView/Card.vue'
import List from '~/components/NoteView/List.vue'

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
    notesBySort() {
      const sort = this.$store.state.notesSort
      return _.orderBy(this.NoteData, ['id'], [sort])
    },
  },

  mounted() {
    this.getAllNotes()
  },

  methods: {
    getAllNotes() {
      this.$store.dispatch('db/get_all_notes')
    },
    actRedirect(id) {
      this.$router.push({ path: `/note/${id}` })
    },
  }
}