<template>
  <div id="text-field">
    <b-row
        class="text-field"
        no-gutters>
      <b-col>
        <b-textarea
            no-resize
            rows="4"
            class="textarea"
            v-model="newMessage"
            @keydown.enter="sendMessage"
        >
        </b-textarea>
      </b-col>
      <b-col cols="2" class="mx-2">
        <b-button
            variant="primary"
            class="send-btn"
            @click="sendMessage"
            :disabled="newMessage.trim().length === 0"
        >
          Отправить
        </b-button>
<!--        <b-button class="ml-1 bg-transparent border-secondary">-->
<!--          <b-icon icon="emoji-smile" variant="secondary"></b-icon>-->
<!--        </b-button>-->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "TextField",
  data: () => ({
    newMessage: '',
  }),
  computed: {
    ...mapState('storage', [
        'userDetails'
    ])
  },
  methods: {
    ...mapActions('storage', [
        'firebaseSendMessage'
    ]),
    sendMessage() {
      if (this.newMessage.trim().length > 0) {
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: this.userDetails.name,
            userId: this.userDetails.userId
          },
          otherUserId: this.$route.params.otherUserId
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.send-btn
  width: 100%
</style>
