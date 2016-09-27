var express = require('express');
var config = require('../config.js');
var connection = require('./database/database.js');
var Photo = require('./database/models/photo.js');
var User = require('./database/models/user.js');

var app = express();

require('./database/joins.js')(connection);
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
require('./database/joins.js')(connection);

app.set('port', config.port);

// nuke the database by passing {force: true} inside sync()
connection.sync({force: true}).then(function () {

    Photo.create({
      info: 'test'
    })
    .then(function (found) {
      User.create({
        email: 'test@example.com'
      })
      .then(function (newUser) {
        return found.addUser(newUser, {
          like: true
        });
      })
      .then(function (like) {
        console.log(like);
      });
    })
    .catch(function (err) {
      throw err;
    });


  app.listen(app.get('port'), function() {
    console.log('listening on port ', app.get('port'));
  });
}).catch(function (err) {
  console.log(err);
});

module.exports.app = app;