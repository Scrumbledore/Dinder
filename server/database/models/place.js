var Sequelize = require('sequelize');
var connection = require('../database.js');

var Place = connection.define('Place', {
  lat: Sequelize.STRING,
  lon: Sequelize.STRING,
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  url: Sequelize.STRING
});

// include field "category"


module.exports = Place;