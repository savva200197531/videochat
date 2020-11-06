<template>
  <div id="video-chat" class="video-chat">
    <b-row align-v="center" class="load video" no-gutters v-if="hideSpinner">
      <b-col md="12" class="text-center">
        <b-spinner class="load" variant="primary" label="Spinning"></b-spinner>
      </b-col>
    </b-row>
    <b-row class="video" no-gutters v-else>
      <b-col class="video-grid">
        <div class="video-grid__item">
          <video playsInline muted ref="userVideo" autoPlay/>
        </div>
        <div class="video-grid__item">
          <video playsInline ref="partnerVideo" autoPlay/>
        </div>
        <div class="video-grid__item">
          <span v-for="(user, key) in usersOnline" :key="key">
            <b-button v-if="user !== userDetails.userId" @click="callPeer(key)">Call {{ key }}{{ user.name }}</b-button>
          </span>
          <!--          <b-button @click="callPeer(userDetails.userId)">Call {{ userDetails.userId }}{{ userDetails.name }}</b-button>-->
        </div>
        <div class="video-grid__item">
          <div v-if="receivingCall">
            <h1>{{ caller }} is calling you</h1>
            <b-button @click="acceptCall">Accept</b-button>
          </div>
          <b-button variant="primary" @click="click">Click!!!</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState, mapGetters } from 'vuex'
import Peer from 'simple-peer'

export default {
  name: "VideoChat",
  data: () => ({
    socket: null,
    stream: null,
    receivingCall: false,
    caller: '',
    callerSignal: null,
    callAccepted: false,
    callPeerButton: false,
    usersFiltered: [],
    hideSpinner: false,
    video: true,
    audio: true,
  }),
  computed: {
    ...mapState('storage', [
      'userDetails'
    ]),
    ...mapGetters('storage', [
      'users',
      'usersOnline'
    ]),
    otherUserDetails() {
      if (this.$store.state.storage.users[this.$route.params.otherUserId]) {
        return this.$store.state.storage.users[this.$route.params.otherUserId]
      } else {
        return ''
      }
    }
  },
  methods: {
    click() {
      console.log(this.users)
    },
    callPeer(id) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: this.stream,
      })

      peer.on('signal', data => {
        this.socket.emit('callUser', {
          userToCall: id,
          signalData: data,
          from: this.userDetails.userId,
        })
      })

      peer.on('stream', stream => {
        if (this.$refs.partnerVideo) {
          this.$refs.partnerVideo.srcObject = stream
        }
      })

      this.socket.on('callAccepted', signal => {
        this.callAccepted = true
        peer.signal(signal)
      })
    },
    acceptCall() {
      this.callAccepted = true
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: this.stream
      })

      peer.on('signal', data => {
        this.socket.emit('acceptCall', {
          signal: data,
          to: this.caller
        })
      })

      peer.on('stream', stream => {
        this.$refs.partnerVideo.srcObject = stream
      })

      peer.signal(this.callerSignal)
    },
    setVideo() {
      if (this.userDetails.userId) {
        // [this.video, this.audio] = [true, true]
        this.socket = io.connect('http://localhost:8000')
        navigator.mediaDevices.getUserMedia({ video: this.video, audio: this.audio }).then(stream => {
          this.stream = stream
          if (this.$refs.userVideo) {
            this.$refs.userVideo.srcObject = stream
          }
        }).catch(error => console.error(error))

        this.socket.emit("yourID", this.userDetails.userId);
        this.socket.emit("allUsers", this.userDetails.userId);

        this.socket.on('hey', data => {
          this.receivingCall = true
          this.caller = data.from
          this.callerSignal = data.signal
        })
      }
    },
  },
  watch: {},
  mounted() {
    const setVideo = setInterval(() => {
      if (this.userDetails.userId) {
        this.setVideo()
        this.hideSpinner = false
        clearInterval(setVideo)
      } else {
        this.hideSpinner = true
      }
    }, 1000)
  },
  destroyed() {
    if (this.userDetails.userId) {
      console.log('destroy');
      [ this.video, this.audio ] = [ false, false ];
      this.stream = null
      this.$refs.userVideo = null
      this.$refs.otherUserVideo = null
    }
  }
}
</script>

<style scoped lang="sass">
.btn
  bottom: 150px

.video
  height: calc(70vh + 56px)

.video-grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: repeat(2, 1fr)
//justify-items: center

.video-grid__item
//justify-self: stretch
//border: 1px solid#000
//align-self: stretch
//background: #f8f9fa

video
  max-width: 100%

</style>
