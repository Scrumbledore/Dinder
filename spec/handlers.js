var request = require('request');
var expect = require('chai').expect;
var config = require('../config.js');
var connection = require('../server/database/database.js');
var User = require('../server/database/models/user.js');
var Photo = require('../server/database/models/photo.js');
var Place = require('../server/database/models/place.js');

require('../server/database/joins.js')(connection);

var api;
var instanceIds = {};

var models = [
  {
    schema: User,
    options: {
      email: 'test@example.com'
    },
    id: null
  },
  {
    schema: Photo,
    options: {
      info: 'test'
    },
    id: null
  },
  {
    schema: Place,
    options: {
      name: 'example'
    },
    id: null
  }
];

describe('Database Handlers', function () {

  before(function (done, next) {

    api = (process.env.NODE_ENV !== 'production'
        ? 'http://localhost'
        : config.apiRoot)
        + ':'
        + config.port
        + '/';

    models.forEach(function (m, i) {
      m.schema.findOne({
        where: m.options
      })
      .then(function (record) {
        if (!record) {
          return m.schema.create(m.options);
        } else {
          return record;
        }
      })
      .then(function (instance) {
        m.id = instance.id;
        if (i + 1 === models.length) {
          models.forEach(function (ins) {
            instanceIds[ins.schema] = ins.id;
          });
          done();
        }
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  after(function (done) {
    models.forEach(function (m, i) {
      m.schema.findOne({
        where: m.options
      })
      .then(function (record) {
        if (record) {
          return record.destroy();
        }
      })
      .then(function () {
        if (i + 1 === models.length) {
          done();
        }
      })
      .catch(function (err) {
        done();
      });
    });
  });

  it('should persist user likes (swipe left/right)', function (done) {

    var call = api + 'yes/' + instanceIds["User"] + '/' + instanceIds["Photo"];
    request(call, function (err, res, body) {
      if (err) {
        done(err);
      }
      console.log(body);
      expect(body).to.be.ok;
      done();
    });
  });

  xit('should default to favorited = false for user photos', function (done) {

  });

  xit('should persist user favorites', function (done) {

  });

  xit('should update user favorites', function (done) {

  });

});