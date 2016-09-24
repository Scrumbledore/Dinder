var Sequelize = require('sequelize');
var config = require('../../config.json');

var connection = config.database;

var sequelize = new Sequelize(connection,
  {
    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;