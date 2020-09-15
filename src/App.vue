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
</style>
