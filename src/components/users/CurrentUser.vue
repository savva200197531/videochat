<template>
  <div id="current-user">
    <user-info/>
    <display-messages/>
  </div>
</template>

<script>
import UserInfo from '@/components/users/UserInfo';
import DisplayMessages from '@/components/chat/DisplayMessages';

export default {
  name: "CurrentUser",
  components: {
    UserInfo,
    DisplayMessages
  }
}
</script>

<style scoped>

</style>
