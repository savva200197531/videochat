<template>
  <b-col cols="8" id="chat-page">
    <current-user/>
    <text-field/>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'
import TextField from '@/components/chat/TextField';
import CurrentUser from '@/components/users/CurrentUser';

export default {
  name: "ChatPage",
  components: {
    TextField,
    CurrentUser
  },
  data: () => ({}),
  computed: {
    ...mapState('storage', [
      'messages'
    ])
  }
}
</script>

<style lang="sass" scoped>

</style>
