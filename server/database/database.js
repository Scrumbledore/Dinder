var Sequelize = require('sequelize');
var config = require('../../config.js');

var connection = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_ADDRESS_HOST,
  port: config.DB_ADDRESS_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  logging: false
});

// var connection = new Sequelize('dinder', 'esoh', 'esoh', {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },
// });

module.exports = connection;
