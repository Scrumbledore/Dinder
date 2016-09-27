var Sequelize = require('sequelize');
var db = require('../database.js');

var Photo = db.define('Photo', {
  info: Sequelize.STRING,
  url: Sequelize.STRING
});


module.exports = Photo;