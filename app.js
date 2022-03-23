const http = require('http')
const express = require('express')
const osc = require('osc')

const app = express()
app.use(express.static('public'))

app.set('port', '3000')

var udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57121,
  metadata: true
});

udpPort.open();

const server = http.createServer(app)
server.on('listening', () => {
 console.log('Listening on port 3000')
})

// Web sockets
const io = require('socket.io')(server)

io.sockets.on('connection', (socket) => {
  console.log('Client connected: ' + socket.id)

  socket.on('data', (data) => {
    socket.broadcast.emit('data', data)
    oscData = data;
    sendOSC();
  })

  socket.on('disconnect', () => console.log('Client has disconnected'))
})

server.listen('3000')

function sendOSC(){

  udpPort.send({
    address: "/phase",
    args: [
      {
          type: "f",
          value: oscData.x
      },
      {
          type: "f",
          value: oscData.y
      },
      {
          type: "i",
          value: oscData.e
      },
      {
          type: "f",
          value: oscData.a
      }
    ]

  }, "127.0.0.1", 1313);
}

//server.listen(3000)