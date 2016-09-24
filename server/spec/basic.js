var request = require('request');
var expect = require('chai').expect;
var config = require('../../config.js');

var api;
var end;

describe('the API server', function () {
  before(function () {
    api = (process.env.NODE_ENV !== 'production'
        ? 'http://localhost'
        : config.apiRoot)
        + ':'
        + config.port;
    end = '/';
  });

  it('should respond to GET requests', function (done) {
    request(api + end, function (err, res, body) {
      if (err) {
        done(err);
      }
      expect(body).to.be.ok;
      done();
    });
  });

  it('response should be valid JSON', function (done) {
    request(api + end, function (err, res, body) {
      if (err) {
        done(err);
      }
      expect(body).to.be.a('string');
      expect(JSON.parse(body)).to.be.ok;
      done();
    });
  });
});