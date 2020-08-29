<template>
  <div id="main-wrapper-page">
    <nav-bar-main/>
    <b-row class="users" align-v="stretch" no-gutters>
      <b-col class="users-list shadow-sm">
        <users-list/>
      </b-col>
      <b-col cols="8">
        <router-view/>
      </b-col>
      <b-col class="users-online shadow-sm">
        <users-online/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <v-footer/>
    </b-row>
  </div>
</template>

<script>
import NavBarMain from '@/components/general/NavBarMain';
import UsersList from '@/components/users/UsersList';
import VFooter from '@/components/general/VFooter';
import UsersOnline from '@/components/users/UsersOnline';

export default {
  name: "MainWrapperPage",
  components: {
    // CurrentUser,
    NavBarMain,
    UsersList,
    VFooter,
    UsersOnline
  },
  props: {},
  data: () => ({}),
  methods: {}
}
</script>

<style lang="sass" scoped>
.users-list
  z-index: 1
</style>
