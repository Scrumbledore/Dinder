var bodyParser = require('body-parser');

module.exports = function (app, express) {

  // app.use(bodyParser.urlencoded({extended: true})); // not sure if needed
  app.use(bodyParser.json());

};