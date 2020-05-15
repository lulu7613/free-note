<template>
  <div>
    id: {{ routerId }}
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  created() {
  },

  computed: {
    routerId() {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>

</style>