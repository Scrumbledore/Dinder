var User = require('../database/models/user.js');

module.exports = {

  signIn: function (req, res) {
    // something here
    console.log('logging in');
  },


  // expects req.body to be object with relevant information
  signUp: function (req, res) {
    console.log(req.body);
    User.findOne({
      where: {email: req.body.email}
    }).then(
      function(user) {
        if (user) {
          // responds with user exists
          res.status(500).send({error: 'user exists'});
        } else {
          // right now just creates a user, we don't have auth decided
          User.create({
            email: req.body.email
          }).then(
            function(newUser) {
              // responds with new user atm
              res.json(newUser);
            }
          );
        }
      },
      // error logging
      function(err) {
        console.log('err:', err);
      }
    );
  }

};