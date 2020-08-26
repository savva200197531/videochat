<template>
  <div id="logout" class="ml-auto">
    <b-button
        @click="logout"
        class="button bg-primary ml-auto"
        v-if="userDetails.userId"
    >
      Выйти
    </b-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "Logout",
  data: () => ({}),
  computed: {
    ...mapState('storage', [
      'userDetails'
    ])
  },
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

<style lang="sass" scoped>

</style>
