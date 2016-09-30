var Sequelize = require('sequelize');
var connection = require('../database.js');

var Place = connection.define('Place', {
  lat: Sequelize.STRING,
  lon: Sequelize.STRING,
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  category1: Sequelize.STRING,
  category2: Sequelize.STRING,
  category3: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  url: Sequelize.STRING
});


module.exports = Place;