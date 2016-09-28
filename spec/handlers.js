var request = require('request');
var expect = require('chai').expect;
var config = require('../config.js');
var connection = require('../server/database/database.js');
var User = require('../server/database/models/user.js');
var Photo = require('../server/database/models/photo.js');
var Place = require('../server/database/models/place.js');
var UserPhotos = require('../server/database/models/userPhotos.js');

require('../server/database/joins.js')(connection);

var api;
var instanceIds = {};

var models = [
  {
    schema: User,
    name: 'User',
    options: {
      email: 'test@example.com'
    }
  },
  {
    schema: Photo,
    name: 'Photo',
    options: {
      info: 'test'
    }
  },
  {
    schema: Place,
    name: 'Place',
    options: {
      name: 'example'
    }
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
        instanceIds[m.name] = instance.id;
        if (i + 1 === models.length) {
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

    var call = api
             + 'api/yes/'
             + instanceIds['User']
             + '/'
             + instanceIds['Photo'];

    request.post(call, function (err, res, body) {
      if (err) {
        done(err);
      }
      expect(res.statusCode).to.equal(201);
      done();
    });
  });

  it('should default to favorited = false for photos', function (done) {

    UserPhotos.findOne({
      where: {
        UserId: instanceIds['User'],
        PhotoId: instanceIds['Photo']
      }
    })
    .then(function (record) {
      expect(record.favorite).to.be.false;
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });

  it('should persist user favorites', function (done) {

    var call = api
             + 'api/favorites/'
             + instanceIds['User']
             + '/'
             + instanceIds['Photo'];

    request.post(call, function (err, res, body) {
      if (err) {
        done(err);
      }
      UserPhotos.findOne({
        where: {
          UserId: instanceIds['User'],
          PhotoId: instanceIds['Photo']
        }
      })
      .then(function (record) {
        expect(record.favorite).to.be.true;
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

});