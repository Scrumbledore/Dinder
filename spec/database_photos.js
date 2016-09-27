var expect = require('chai').expect;
var config = require('../config.js');

describe('Database: Photos', function () {

  before(function (done) {

    // create a test record, if one doesn't already exist
    Photo.findOne({
      where: {
        info: 'test'
      }
    })
    .then(function (found) {
      if (!found) {
        Photo.create({
          info: 'test'
        })
        .then(function () {
          done();
        });
      } else {
        done();
      }
    })
    .catch(function (err) {
      done(err);
    });
  });

  after(function (done) {

    // remove the test record, if it exists
    Photo.findOne({
      where: {
        info: 'test'
      }
    })
    .then(function (found) {
      if (found) {
        return found.destroy();
      }
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done();
    });
  });

  it('should persist photo records', function (done) {

    Photo.findOne({
      where: {
        info: 'test'
      }
    })
    .then(function (found) {
      expect(found).to.exist;
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });
});