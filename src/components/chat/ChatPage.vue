<template>
  <div id="chat-page" class="border">
    <user-info/>
    <display-messages/>
    <text-field/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserInfo from '@/components/users/UserInfo';
import DisplayMessages from '@/components/chat/DisplayMessages';
import TextField from '@/components/chat/TextField';

export default {
  name: "ChatPage",
  components: {
    UserInfo,
    DisplayMessages,
    TextField
  },
  data: () => ({

  }),
  computed: {
    ...mapState('storage', [
        'messages'
    ])
  }
}
</script>

<style lang="sass" scoped>

</style>
