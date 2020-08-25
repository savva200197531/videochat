<template>
  <div id="users-list">
    <h1>Users list</h1>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  name: "UserList",
  props: {

  },
  data: () => ({

  }),
  methods: {
    ...mapActions('storage', [
        'handleOnAuthStateChanged'
    ])
  },
  mounted() {
    this.handleOnAuthStateChanged();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.replace('/').catch(() => {})
      } else {
        this.$router.replace('/register').catch(() => {})
      }
    })
  }
}
</script>

<style scoped>

</style>
