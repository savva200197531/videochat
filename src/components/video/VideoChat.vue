<template>
  <div id="video-chat" class="video-chat">
    <h1>Video Chat</h1>
<!--    <video playsinline muted v-if="stream" ref="userVideo" autoplay></video>-->
<!--    <video playsinline v-if="callAccepted" ref="partnerVideo"></video>-->
<!--    <div>-->
<!--      <button @click="callPeer(key)">Call {{ key }}</button>-->
<!--    </div>-->
<!--    <div v-if="receivingCall">-->
<!--      <h1>{{ caller }} is calling you</h1>-->
<!--      <b-button @click="acceptCall">Accept</b-button>-->
<!--    </div>-->
    <b-button variant="primary" @click="click">Click!!!</b-button>
  </div>
</template>

<script>
// import io from 'socket.io'
// import Peer from 'simple-peer'

export default {
  name: "VideoChat",
  data: () => ({}),
  computed: {},
  methods: {
    click() {},
  },
  mounted() {}
}
</script>

<style scoped lang="sass">
.video-chat
  height: calc(70vh + 56px)
</style>
