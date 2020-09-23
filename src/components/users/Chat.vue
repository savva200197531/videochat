<template>
  <div id="current-user">
    <router-view/>
    <text-field/>
  </div>
</template>

<script>
import TextField from '@/components/chat/TextField';

export default {
  name: "CurrentUser",
  components: {
    TextField,
  },
  methods: {
    log() {
      console.log(this.$router.currentRoute.name)
    }
  }
}
</script>

<style scoped>

</style>
