import SvgIcon from '~/components/SvgIcon.vue'
import { update_note } from '~/api/db.js'

export default {
  components: {
    SvgIcon
  },

  props: {
    noteData: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data: _.cloneDeep(this.noteData)
    }
  },

  filters: {
    returnDate(id) {
      function addZero(num) {
        return (num > 9 ? num : '0' + num)
      }
      const date = new Date(parseInt(id))
      const year = date.getFullYear()
      const month = addZero(date.getMonth())
      const day = addZero(date.getDay())

      return `${year}/${month}/${day}`
    }
  },

  methods: {
    actRedirect(id) {
      this.$emit('actRedirect', id)
    },
    async actStar() {
      this.data.isStar = !this.data.isStar
      await update_note(this.data)
      this.$store.dispatch('db/get_all_notes')
    },
    async actAddDeletePage() {
      this.data.isDelete = true
      await update_note(this.data)
      this.$store.dispatch('db/get_all_notes')
    }
  }
}
