<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions } from 'vuex';
// import firebase from 'firebase';

export default {
  name: 'App',
  methods: {
    ...mapActions('storage', [
      'handleOnAuthStateChanged'
    ])
  },
  mounted() {
    this.handleOnAuthStateChanged();
  }
}
</script>

<style lang="sass">
.list-group-item
  border: none

.user-online
  background: grey
  width: 10px
  height: 10px
  display: inline-block
  border-radius: 50%

.online
  background: #39ea39

.users__list-group
  border-radius: 0
  height: calc(100vh - 90px)
  overflow-y: auto
</style>
