var express = require('express');
//var db = require('./database/database_config.js');

var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.set('port', (process.env.PORT || 1337));

// db.sync().then(function () {
  app.listen(app.get('port'), function() {
    console.log('listening on port ', app.get('port'));
  });
// }).catch(function (err) {
//   console.log(err);
// });
//
module.exports.app = app;