var Sequelize = require('sequelize');
var db = require('../database.js');

var place = db.define('place', {
  lat: Sequelize.STRING,
  lon: Sequelize.STRING,
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  url: Sequelize.STRING
});


module.exports = place;