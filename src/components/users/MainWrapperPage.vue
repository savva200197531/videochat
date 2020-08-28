<template>
  <div id="main-wrapper-page">
    <nav-bar-main/>
    <b-row class="users" align-v="stretch" no-gutters>
      <users-list/>
      <chat-page/>
      <users-online/>
    </b-row>
    <b-row no-gutters>
      <v-footer/>
    </b-row>
  </div>
</template>

<script>
import NavBarMain from '@/components/general/NavBarMain';
import ChatPage from '@/components/chat/ChatPage';
import UsersList from '@/components/users/UsersList';
import VFooter from '@/components/general/VFooter';
import UsersOnline from '@/components/users/UsersOnline';

export default {
  name: "MainWrapperPage",
  components: {
    NavBarMain,
    ChatPage,
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

</style>
