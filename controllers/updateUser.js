const User = require("../models/user");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const uuidv1 = require('uuid/v1');

if (process.env.NODE_ENV === 'production') {
  var secret = process.env.SECRET
} else {
  const config = require('../config');
  var secret = config.secret;
}


exports.update = function(req, res, next){

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const location = req.body.location;

    User.findOne({email: email}, function(err, user){

        if(err) {return next(err)};

        if(user) {

          User.update({email: email}, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            location: location
          }).then(function(response){
            res.send({firstName: firstName, lastName: lastName, location: location});
          });
        }
    });
}

exports.fetchUser = function(req, res, next) {

    const email = req.query.email;
    User.findOne({email: email}, function(err, user){

        if(err) {return next(err)};

        if(user) {
          var userDetails = {firstName: user.firstName, lastName: user.lastName, email: user.email, location: user.location}
          res.send(userDetails);
        }
    });

}

exports.addBook = function(req, res, next) {

  const email = req.body.email;
  const book = req.body.book;
        book.uid = uuidv1();

  User.findOne({email: email}, function(err, user){

      if(err) {return next(err)};

      if(user) {
        User.update({email: email}, {
          $addToSet: {
            books : book
          }
        }).then(function(response){
          res.send("Book added to list!");
        }).catch(function(e){console.log(e)});
      }
  });
}

exports.getMyBooks = function(req, res, next) {

  const email = req.query.email;

  User.findOne({email: email}, function(err, user){

      if(err) {return next(err)};

      if(user) {
        User.find({email: email}, {books: 1, requests_received: 1}).then(function(response){
          res.send(response);
        }).catch(function(e){console.log(e)});
      }
  });
}

exports.getAllBooks = function(req, res, next) {
  const email = req.query.email;

  User.find({}).then(function(response){
    var users = response.filter(function(user){
      return user.email !== email;
    });

    var myObj = users.map(function(user){
      var obj = {
        user: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        books: user.books
      }
      return obj;
    });

    var allBooks = myObj.filter(function(obj){
      return obj.books.length > 0;
    });

    var thisUser = response.filter(function(user){
      return user.email === email;
    });

    var thisUserRequestsSent = thisUser[0].requests_sent;

    var payload = {allBooks: allBooks, requestsSent: thisUserRequestsSent}
    res.send(payload);
  })

}

exports.updateRequests = function(req, res, next) {
  var trader = req.body.trader;
  var owner = req.body.owner;
  var book = req.body.book;
  var timestamp = new Date();

  User.update({email: trader}, {
    $addToSet: {requests_sent: book}
  }).then(function(){
    User.update({email: owner}, {
      $addToSet: {requests_received: {trader: trader, book: book, timestamp: timestamp.getTime()}}

    }).then(function(){
      User.find({email: trader}, {requests_sent: 1}).then(function(response){
        res.send(response);
  })
})
}).catch(function(e){console.log(e)});
}

exports.getRequestsSent = function(req, res, next) {

}

exports.getRequestsReceived = function(req, res, next) {

}
