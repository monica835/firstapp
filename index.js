//Require the express moule
var express = require('express');

//create a new express application
var app = express()

//require the http module
var http = require('http').Server(app)

var io = require('socket.io');

var port = 500;

var socket = io(http);
//create an event listener

//To listen to messages
socket.on('connection', (socket)=>{
console.log('user connected');
socket.on("disconnect", ()=>{
console.log("Disconnected")
})
});

(function() {
  var  socket  =  io();
  $("form").submit(function(e) {
      e.preventDefault(); // prevents page reloading
      socket.emit("chat message", $("#m").val());
      $("#m").val("");
  return  true;
});
});
socket.emit("chat message", $("#m").val());
socket.on("chat message", function(msg) {
  console.log("message: "  +  msg);
  //broadcast message to everyone in port:5000 except yourself.
  socket.broadcast.emit("received", { message: msg  });
  });


//wire up the server to listen to our port 500
http.listen(port, ()=>{
console.log('connected to port: '+ port)
});