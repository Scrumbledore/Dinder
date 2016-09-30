const passport = require('passport');
const User = require('../database/models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const config = require('../../config');

var authHandler = require('../handlers/authHandler.js');


// username/password local strategy
const localOptions = { usernameField: 'email' };

//find user then see if they have a valid password
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.find({ where: { email: email } }, function(err, user) {
    if (err) { 
      return done(err); 
    } else if (!user) { 
      console.log('no user found'); 
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// jwt strategy options
const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), //look for auth header
  secretOrKey: config.JWT_SECRET
};

// jwt strategy
const jwtLogin = new JwtStrategy(opts, function(jwtPayload, done) {
  User.findOne({ where: { id: jwtPayload.id } })
  .then(function(user) {
    console.log('jwtPayload', jwtPayload);
    if (user) { 
      console.log('found user');
      done(null, user);
    } else {
      done(null);
    }
  })
  .catch(function(err) {
    return done(err);
  });
});
    
//use strategies
passport.use(jwtLogin);
passport.use(localLogin);
