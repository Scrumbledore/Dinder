const User = require('../database/models/user.js');
const config = require('../../config');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = {

  signUp(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ where: { email }})
      .then(user => {
        if (user) {
          return next(new Error('User Already Exists!'));
        } else {
          const newUser = User.create ({
            email: email,
            password: password
          })
          .then(newUser => res.json({ token: jwt.encode({ id: User.id }, config.JWT_SECRET) }) );
        }
      })
      .catch(error => {
        res.sendStatus(500);
        console.log(error);
      });
  },

  signIn(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ where: { email }})
      .then(User => {
        if (!User) {
          return next(new Error('No User Found!'));
        }
        bcrypt.compare(password, User.password, function(err, match) {
          if (match) {
            console.log('login successful');
            res.json({ token: jwt.encode({ id: User.id }, config.JWT_SECRET) });
          } else if (err) {
            console.log('login error');
          } else {
            console.log('no match');
          }
        });
      })
      .catch(error => {
        res.sendStatus(500);
        console.log(error);
      });
  },

  authorize(req, res, next) {
    var token = req.headers.authorization;
    var path = req.originalUrl.indexOf('/api/') > -1
             ? req.originalUrl.replace('/api/', '')
             : req.originalUrl;
    if (path === '/' || path === 'signin' || path === 'signup') {
      next();
    } else if (!token) {
      res.sendStatus(401);
    } else {
      req.userId = jwt.decode(token, config.JWT_SECRET).id;
      next();
    }
  }
};
