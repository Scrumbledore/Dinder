var expect = require('chai').expect;
var connection = require('../server/database/database.js');
var User = require('../server/database/models/user.js');
var Place = require('../server/database/models/place.js');
var Photo = require('../server/database/models/photo.js');
var UserPhotos = require('../server/database/models/userPhotos.js');
var UserRatings = require('../server/database/models/userRatings.js');

require('../server/database/joins.js')(connection);

var models = [
  {
    schema: User,
    options: {
      email: 'test@example.com'
    }
  },
  {
    schema: Photo,
    options: {
      info: 'test'
    }
  }
];

describe('Database Models', function () {

  before(function (done, next) {
    models.forEach(function (m, i) {
      m.schema.findOne({
        where: m.options
      })
      .then(function (found) {
        if (!found) {
          return m.schema.create(m.options);
        }
      })
      .then(function () {
        if (i + 1 === models.length) {
          done();
        }
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  // after(function (done) {
  //   models.forEach(function (m, i) {
  //     m.schema.findOne({
  //       where: m.options
  //     })
  //     .then(function (found) {
  //       if (found) {
  //         return found.destroy();
  //       }
  //     })
  //     .then(function () {
  //       if (i + 1 === models.length) {
  //         done();
  //       }
  //     })
  //     .catch(function (err) {
  //       done();
  //     });
  //   });
  // });

  it('should persist user records', function (done) {

    User.findOne({
      where: {
        email: 'test@example.com'
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

  it('should not persist duplicate user records', function (done) {

    User.create({
      email: 'test@example.com'
    })
    .catch(function (err) {
      expect(err).to.be.ok;
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

  it('should persist user votes', function (done) {

    Photo.findOne({
      where: {
        info: 'test'
      }
    })
    .then(function (photo) {
      User.findOne({
        where: {
          email: 'test@example.com'
        }
      })
      .then(function (user) {
        photo.addUser(user, {
          like: true
        })
        .then(function () {
          return photo.hasUser(user);
        })
        .then(function (voted) {
          expect(voted).to.be.true;
          return photo.getUsers();
        })
        .then(function (users) {
          expect(users).to.have.lengthOf(1);
          expect(users[0].id).to.equal(user.id);
          expect(users[0].UserPhotos).to.exist;
          expect(users[0].UserPhotos.like).to.be.true;
          done();
        });
      });
    })
    .catch(function (err) {
      done(err);
    });
  });

});