var expect = require('chai').expect;
var config = require('../config.js');
var connection = require('../server/database/database.js');
var User = require('../server/database/models/user.js');
var Photo = require('../server/database/models/photo.js');

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

  it('should save user votes', function (done) {

    Photo.findOne({
      where: {
        info: 'test'
      }
    })
    .then(function (found) {
      User.create({
        email: 'test@example.com'
      })
      .then(function (newUser) {
        return found.addUser(newUser, {
          like: true
        });
      })
      .then(function (like) {
        console.log(like);
        done();
      });
    })
    .catch(function (err) {
      done(err);
    });
  });

});