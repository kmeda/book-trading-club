const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const CircularJSON = require('circular-json');
const favicon = require('serve-favicon');
var Router = require("./router.js");

const app = express();
const PORT = process.env.PORT || 3050;

var io = require('socket.io').listen(app.listen(PORT));

mongoose.connect('mongodb://admin:admin@ds153003.mlab.com:53003/fcc-book-club', {useMongoClient: true});

// app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname + '/favicon.ico')));
app.use(express.static('dist'));

io.sockets.on('connection', function (socket) {
    console.log('client connected');
    socket.on('connected', function(){
      console.log("React Client Connected");
    });

    socket.on('book_added', function(){
      io.emit("pull_new_books");
    });

    socket.on('book_removed', function(){
      io.emit("pull_new_books");
    });

    socket.on("request_sent", function(){
      io.emit("pull_requests_received");
    })

    socket.on('request_cancelled', function(){
      io.emit("pull_requests_sent");
      io.emit("pull_requests_received");
    });

    socket.on('request_approved', function(){
      io.emit("pull_requests_sent");
      io.emit("pull_requests_received");
      io.emit("pull_new_books");
    });
});

Router(app);

console.log(`Server listening at port ${PORT}`);
