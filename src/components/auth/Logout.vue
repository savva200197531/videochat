<template>
  <div id="logout">
    <b-button
        @click="logout"
        class="bg-primary ml-2"
    >
      Выйти
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Logout",
  data: () => ({}),
  methods: {
    ...mapActions('storage', [
        'userLogout'
    ]),
    logout() {
      this.userLogout()
    }
  }
}
</script>

<style scoped>

</style>
