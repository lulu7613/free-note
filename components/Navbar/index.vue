<template>
  <div class="py-4 d-flex justify-content-between align-items-center">
    <select-sort />
    <notes-view />
  </div>
</template>

<script>
import SelectSort from './components/SelectSort.vue'
import NotesView from './components/NotesView.vue'

export default {
  components: {
    SelectSort,
    NotesView
  }
}
</script>