var Sequelize = require('sequelize');
var request = require('request');
var expect = require('chai').expect;
var config = require('../config.js');

var connection = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_ADDRESS_HOST,
  port: config.DB_ADDRESS_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

describe('the database server', function () {

  it('should authenticate', function (done) {
    connection.authenticate().then(function (conf) {
      done(conf);
    }).catch(function (err) {
      done(err);
    });
  });

});