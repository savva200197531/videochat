<template>
  <div id="display-messages">
    <b-row class="chat pl-2 pb-2" no-gutters>
      <b-col>
        <b-list-group class="message__group">
          <b-spinner variant="primary" label="Spinning" v-if="hideSpinner" class="spinner"></b-spinner>
          <b-list-group-item
              class="message__item my-2"
              v-for="(message, idx) in messages"
              :key="idx"
              :class="{'your-message': message.userName === 'Savva'}"
          >
            {{ message }} {{ idx }} {{ userDetails.userId }}
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
  width: 40%
  border-radius: 5px

.your-message
  align-self: flex-end
  background: #28a745
  color: #fff
  margin-right: 0.25rem

.spinner
  position: absolute
  right: 50%
  top: 50%
</style>
