const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};
let yourId = '';

io.on('connection', socket => {
  // if (!users[yourId]) {
  //
  // }
  users[yourId] = yourId;
  // console.log(users)

  socket.on("yourID", id => {
    yourId = id
    // console.log(yourId)
  })

  // io.engine.generateId = function (req) {
  //   // generate a new custom id here
  //   const getId = setInterval(() => {
  //     if (yourId) {
  //       clearInterval(getId)
  //       console.log(yourId)
  //       return yourId
  //     } else {
  //       console.log('wait')
  //     }
  //   }, 2000)
  // }
  // socket.on("yourID", (id) => {
  //     yourId = id
  //     console.log(yourId)
  // })

  // io.sockets.emit("allUsers", users);
  socket.on('allUsers', (user) => {
    users[user] = user
  })
  // console.log(users)

  socket.on('disconnect', () => {
      delete users[yourId];
  })

  socket.on("callUser", (data) => {
    console.log(data.userToCall)
    console.log(data.from)
    io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from })
    // console.log(io.to(data.userToCall).emit('hey'))
    // console.log(io.to(data.userToCall))
    // console.log('new socket id', socket.id)
  })

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  })
});

server.listen(8000, () => console.log('server is running on port 8000'));


