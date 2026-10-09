'use strict';

const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const app = module.exports.app = express();
const port = process.env.PORT || 3000;
let day = true;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  console.log("Listening on port: " + port);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  console.log(socket.id);
  io.emit('pumpkinToggle', day);
  
  //receives the rotation value of the slider from Client
  // socket.on("rotation", (arg) => {
  //   console.log(arg); 
  //   io.emit('rotResponse', arg);
  // });

  //recieve the id of the leaf that has been clicked
  socket.on("activeClass", (arg) => {
    console.log(arg); 
    io.emit('classResponse', arg);
  });

  //recieve the pumpkin
  socket.on("pumpkin", () => {
    console.log(day);
    day = !day;
    io.emit('pumpkinToggle', day);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

