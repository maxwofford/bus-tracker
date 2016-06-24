'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const busses = []

app.use(express.static(__dirname + '/public'))

io.on('connection', socket => {

  socket.on('busConnection', () => {
    const bus = {
      socket,
      lat: null,
      long: null
    }
    busses.push(bus)
  })

  socket.on('update', data => {
    for (let i = 0; i < busses.length; i++) {
      if (busses[i].socket.id === socket.id) {
        busses[i].lat = data.lat
        busses[i].long = data.long
        break
      }
    }
  })

  socket.on('disconnect', () => {
    for (let i = 0; i < busses.length; i++) {
      if (busses[i].socket.id === socket.id) {
        busses.splice(i, 1)
        break
      }
    }
  })
})

setInterval(() => {
  const busLocations = busses.map(bus => {
    return {
      lat: bus.lat,
      long: bus.long
    }
  })
  io.emit('tick', busLocations)
  console.log(busLocations)
}, 5000)

server.listen(3000, () => console.log('server started'))
