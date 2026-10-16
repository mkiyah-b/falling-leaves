'use strict';

const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const app = module.exports.app = express();
const port = process.env.PORT || 3000;
let day = true;
let leaves = ['dormant', 'dormant', 'dormant', 'dormant', 'dormant', 'dormant']
let clientCount = 0;
let bats = false;
let skeleton = false;

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
  clientCount++;
  io.emit('clientCount', clientCount);
  // if (clientCount == 1) {
  //   skeleton = true;
  // }
  // else if (clientCount > 2 && !day) {
  //   bats = true;
  // }
  // else {
  //   bats = false;
  //   skeleton = false;
  // }
  // io.emit('bats', bats);
  // io.emit('skeleton', skeleton);
  io.emit('pumpkinToggle', day);
  
  //receives the rotation value of the slider from Client
  // socket.on("rotation", (arg) => {
  //   console.log(arg); 
  //   io.emit('rotResponse', arg);
  // });

  //recieve the id of the leaf that has been clicked
  socket.on("activeClass", (arg) => {
    // console.log(arg); 
    let id = arg.split("l");
    console.log(id[1]);
    if (leaves[id-1] == "dormant") {
      leaves[id-1] = "active";
    };
    io.emit('classResponse', arg);
  });

  //recieve the pumpkin
  socket.on("pumpkin", () => {
    console.log(day);
    day = !day;
    io.emit('pumpkinToggle', day);
  });

  socket.on('disconnect', () => {
    clientCount--;
    console.log('Client disconnected')
    io.emit('clientCount', clientCount);
  });
});

