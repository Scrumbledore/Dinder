var express = require('express');
var config = require('../config.js');
var db = require('./database/database.js');

// uncomment for testing
// var user = require('./database/models/user.js');

var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.set('port', config.port);

// nuke the database by passing {force: true} inside sync()

db.sync().then(function () {
  app.listen(app.get('port'), function() {
    console.log('listening on port ', app.get('port'));

    // uncomment if you want to see this working

    // user.create({
    //   email: 'test@example.com'
    // })
    // .then(function (conf) {
    //   console.log(conf);
    // })
    // .catch(function (err) {
    //   throw err;
    // });

  });
}).catch(function (err) {
  console.log(err);
});

module.exports.app = app;