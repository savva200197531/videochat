<template>
  <div id="display-messages">
    <b-row class="chat pl-2 pb-2" no-gutters>
      <b-col>
        <b-list-group class="message__group">
          <b-list-group-item
              class="message__item my-2"
              v-for="(message, idx) in messages"
              :key="idx"
              :class="{'your-message': message.userName === 'Savva'}"
          >
            {{ message.userName }}: {{ message.message }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "DisplayMessages",
  computed: {
    ...mapState('storage', [
      'messages'
    ])
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
</style>
