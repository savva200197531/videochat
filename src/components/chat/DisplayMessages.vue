<template>
  <div id="display-messages">
    <b-row align-v="center" class="load message__group" no-gutters v-if="hideSpinner">
      <b-col md="12" class="text-center">
        <b-spinner class="load" variant="primary" label="Spinning"></b-spinner>
      </b-col>
    </b-row>
    <b-row class="chat pl-2 pb-2" v-else no-gutters>
      <b-col>
        <b-list-group class="message__group">
          <b-list-group-item
              class="message__item my-2"
              v-for="(message, idx) in messages"
              :key="idx"
              :class="{'your-message': message.userId === userDetails.userId}"
          >
            <span class="message__item-from">{{ message.from }}:</span> {{ message.text }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "DisplayMessages",
  data: () => ({
    hideSpinner: true
  }),
  computed: {
    ...mapState('storage', [
      'messages',
      'userDetails'
    ]),
    otherUserDetails() {
      return this.$store.state.storage.users[this.$route.params.otherUserId]
    }
  },
  methods: {
    ...mapActions('storage', [
      'firebaseGetMessages',
      'firebaseStopGettingMessages'
    ]),
  },
  mounted() {
    const getMessages = setInterval(() => {
      if (this.userDetails.userId !== undefined) {
        this.hideSpinner = false
        this.firebaseGetMessages(this.$route.params.otherUserId)
        clearInterval(getMessages)
      } else {
        this.hideSpinner = true
      }
    }, 100)
  },

  destroyed() {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style lang="sass" scoped>
.message__group
  overflow-y: auto
  height: 70vh

.message__item
  background: #f8f9fa
  border-radius: 3px
  font-size: 15px
  width: 40%
  max-height: 100%
  -ms-hyphens: auto
  -moz-hyphens: auto
  -webkit-hyphens: auto
  hyphens: auto
  text-align: justify

.your-message
  align-self: flex-end
  background: #28a745
  color: #fff
  margin-right: 0.25rem

</style>
