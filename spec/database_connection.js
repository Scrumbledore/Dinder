var expect = require('chai').expect;
var connection = require('../server/database/database.js');
var config = require('../config.js');

describe('PostgreSQL Database', function () {

  it('should authenticate', function (done) {
    connection.authenticate()
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });

});