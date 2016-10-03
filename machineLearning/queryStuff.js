var synaptic = require('synaptic');
var Architect = synaptic.Architect;
var Network; //defining after we get data for training
var Category = require('../server/database/models/category.js');
var photo = require('../server/database/models/photo.js');
var place = require('../server/database/models/place.js');
var User = require('../server/database/models/user.js');

//for testing locally
var connection = require('../server/database/database.js');
require('../server/database/joins.js')(connection);

var trainingData = [];

var trainingOptions = {
  rate: 0.15,
  error: 0.005,
  iterations: 5000
};


User.findOne({ where: {id: 21}})  // fixMe take in dynamic userID
.then(function(data) {
  //console.log(data);
  return data.getPhotos();
})
.then(function(photos) {
  var promiseArr = [];
  var training = [];
  var items = [];

  photos.map(function(photo) {
    var tueple = [[], 0, 0];
    if (photo.UserPhotos.dataValues.like === true) {
      if (photo.UserPhotos.dataValues.favorite === true) {
        tueple[1] = 1;
      } else {
        tueple[1] = 0.6;
      }
    } else if (photo.UserPhotos.dataValues.favorite === true ) {
      tueple[1] = 0.8;
    }
    tueple[2] = photo.PlaceId;
    training.push(tueple);
  });

  training.forEach(function(item) {
    var p = Category.findAll({ attributes: ['name'], where: {PlaceId: item[2]} })
    .then(function(data) {
      data.forEach(function(cat) {
        items.push(cat.dataValues.name);
      });
      item[0] = items;
      items = [];
      return {
        category: item[0],
        weight: item[1],
        businessId: item[2]
      };
    });
    promiseArr.push(p);
  });
  return Promise.all(promiseArr).then(function(p) {
   // console.log(p)
    return p;
  });
})
.then(function(categories) {

});


// // old training data keeping until new feature works

Category.aggregate('name', 'DISTINCT', { plain: false })
.then(function(data) {

  return data.reduce(function(o, v, i) {
    o[v.DISTINCT] = i;
    return o;
  }, {});
})
.then(function(category){
  console.log(category)

  return category;
})

//Network = new Architect.Perceptron(category.length, Math.floor(category.length * .2),category.length);
// .then(function(train){
//   Network.trainer.train(trainingData,trainingOptions);
//   //log margin of error
//   return train;
// })
// .then(function(data){
//   var testObject = makeTraining(data.length);
//   var returnItems = [];
//   console.log(Network.activate(testObject.input));
//   for(var i = 0; i < testObject.input.length; i++){
//     if( testObject.input[i] > 0) {
//       returnItems.push({
//         category: data[i],
//         chance: testObject.input[i]
//       });
//     }
//   }
//   console.log(returnItems);
// });

// var makeTraining = function(n) {
//   var newArray = Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
//   var random = Math.random();


//   newArray[Math.floor(Math.random()*newArray.length)] = .75;
//   if( random > .33) {
//     newArray[Math.floor(Math.random()*newArray.length)] = 1;
//   }
//   if( random > .6) {
//     newArray[Math.floor(Math.random()*newArray.length)] = 1;
//   }

//   return {
//     input: newArray,
//     output: newArray
//   };
// };





// console.log(Network.activate([0, 1, 0, 1, 0]))