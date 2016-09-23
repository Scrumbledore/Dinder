var request = require('request');
var expect = require('chai').expect;
var config = require('../../config.js');

var apiRoot;

describe('the API server', function () {
  before(function () {
    apiRoot = process.env.NODE_ENV !== 'production'
            ? 'http://localhost'
            : config.apiRoot;
  });
  it('should respond to GET requests', function (done) {
    request(apiRoot + ':' + config.port + '/', function (err, res, body) {
      if (err) {
        done(err)
      }
      expect(JSON.parse(body)).to.be.an('object');
      done();
    });
  });
});