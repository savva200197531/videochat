<template>
  <div id="current-user">
    <user-info/>
    <display-messages/>
    <text-field/>
  </div>
</template>

<script>
import UserInfo from '@/components/users/UserInfo';
import DisplayMessages from '@/components/chat/DisplayMessages';
import TextField from '@/components/chat/TextField';

export default {
  name: "CurrentUser",
  components: {
    UserInfo,
    DisplayMessages,
    TextField
  }
}
</script>

<style scoped>

</style>
