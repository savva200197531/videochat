<template>
  <div id="user-info" class="user-info">
    <b-row class="px-2 py-2 bg-light shadow-sm" no-gutters>
      <b-col>
        <b-avatar
            href="#"
        >
        </b-avatar>
        {{ otherUserDetails.name }}
        <span
            class="user-online"
            :class="{'online': otherUserDetails.online}">
        </span>
      </b-col>
      <b-col class="text-right">
        <b-avatar
            :href="'/chat' + '/video/' + userDetails.userId + '/' + this.$route.params.otherUserId"
            variant="success"
            size="40px">
            <b-icon
                style="width: 20px; height: 20px"
                icon="telephone">
            </b-icon>
        </b-avatar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "UserInfo",
  computed: {
    ...mapState('storage', [
      'messages',
      'userDetails'
    ]),
    otherUserDetails() {
      if (this.$store.state.storage.users[this.$route.params.otherUserId]) {
        return this.$store.state.storage.users[this.$route.params.otherUserId]
      } else {
        return ''
      }

    }
  },
  components: {},
  data: () => ({})
}
</script>

<style lang="sass" scoped>
.loading

</style>
