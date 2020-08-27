<template>
  <div id="users-list">
    <nav-bar-main/>
    <b-row class="users" align-v="stretch" no-gutters>
      <b-col class="users__list shadow-sm" cols="2">
        <users-list/>
      </b-col>
      <b-col cols="8">
        <chat-page/>
      </b-col>
      <b-col>
        <h3>Активные контакты</h3>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
          class="footer bg-light"
      >
        <b-form-text class="ml-2">Made by Savva <b-icon icon="emoji-sunglasses"></b-icon></b-form-text>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NavBarMain from '@/components/general/NavBarMain';
import ChatPage from '@/components/chat/ChatPage';
import UsersList from '@/components/users/UsersList';

import { mapState } from 'vuex'

export default {
  name: "MainWrapperPage",
  components: {
    NavBarMain,
    ChatPage,
    UsersList
  },
  computed: {
    ...mapState('storage', [
      'users'
    ])
  },
  props: {},
  data: () => ({}),
}
</script>

<style lang="sass" scoped>
.footer
  width: 100vw
  height: 33px
</style>
