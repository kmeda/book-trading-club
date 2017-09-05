const User = require("../models/user");


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
