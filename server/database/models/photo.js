var Sequelize = require('sequelize');
var db = require('../database.js');

var photo = db.define('photo', {
  info: Sequelize.STRING,
  url: Sequelize.STRING
});


module.exports = photo;