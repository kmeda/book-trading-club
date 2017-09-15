const path = require('path');
const Authentication = require("./controllers/authentication");
const updateUser = require("./controllers/updateUser");
const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {


  // app.get('/signin', function(req, res, next){
  //   res.redirect('https://fcc-booktrading-club.herokuapp.com');
  // });
  //
  // app.get('/signup', function(req, res, next){
  //   res.redirect('https://fcc-booktrading-club.herokuapp.com');
  // })

  app.post('/signin_user', requireSignin, Authentication.signin);
  app.post('/signup_user', Authentication.signup);

  app.post('/update_user', updateUser.update);
  app.get('/get_user', updateUser.fetchUser);

  app.post('/add_book', updateUser.addBook);
  app.post('/remove_book', updateUser.removeBook);
  app.get('/get_my_books', updateUser.getMyBooks);
  app.get('/get_all_books', updateUser.getAllBooks);

  app.post('/request_book', updateUser.updateRequests);
  app.get('/requests_received', updateUser.requestsReceived);
  app.get('/requests_sent', updateUser.requestsSent);

  app.post('/cancel_request', updateUser.cancelRequest);
  app.post('/approve_request', updateUser.approveRequest);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
