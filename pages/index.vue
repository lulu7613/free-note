<template>
  <div>
    所有筆記
  </div>
</template>

<script>

export default {
  components: {
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

<style>
</style>
