<template>
  <div id="video-chat" class="video-chat">
    <b-row class="video" no-gutters>
      <b-col class="video-grid">
        <div class="video-grid__item">
          <video playsInline muted ref="userVideo" autoPlay/>
        </div>
        <div class="video-grid__item">
          <video playsInline ref="partnerVideo" autoPlay/>
        </div>
        <div class="video-grid__item">
          <span v-for="(user, key) in users" :key="key">
            <b-button v-if="user !== yourID" @click="callPeer(user)">Call {{ user }}</b-button>
          </span>
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
// import socket from 'socket.io'
import Peer from 'simple-peer'

export default {
  name: "VideoChat",
  data: () => ({
    // useRef
    socket: null,
    // useState
    yourID: '',
    users: {},
    stream: null,
    receivingCall: false,
    caller: '',
    callerSignal: null,
    callAccepted: false,
    // other
    callPeerButton: false,
    usersFiltered: []
  }),
  computed: {},
  methods: {
    click() {
      // this.setVideo()
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
          from: this.yourID,
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
      // chat/video/1ogu7FCsztXPJKRkyjQB2AwwOhG3/jGAQHzKsERWDGnjSFEknivXcCWJ3
      this.socket = io.connect('http://localhost:8000')
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        this.stream = stream
        console.log(this.stream)
        if (this.$refs.userVideo) {
          this.$refs.userVideo.srcObject = stream
        }
      })
      this.socket.on("yourID", (id) => {
        this.yourID = id;
      })
      this.socket.on("allUsers", (users) => {
        this.users = users;
      })
      this.socket.on("hey", (data) => {
        console.log(data)
        this.receivingCall = true
        this.caller = data.from
        this.callerSignal = data.signal
      })
    },
    // filterUsers() {
    //   const getUsers = setInterval(() => {
    //     let users = this.users
    //     if (!users) {
    //       console.log(users)
    //     } else {
    //       Object.keys(users).map(key => {
    //         console.log(key)
    //         if (key !== this.yourID) {
    //           console.log(users)
    //           this.usersFiltered.push(users)
    //         }
    //       })
    //       clearInterval(getUsers)
    //     }
    //   }, 100)
    // }
  },
  mounted() {
    this.setVideo()
    // this.filterUsers();
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
  justify-items: center

.video-grid__item
  justify-self: stretch
  //border: 1px solid#000
  align-self: stretch
  background: #f8f9fa

video
  max-width: 100%

</style>
