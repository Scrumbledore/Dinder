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

var beforeTraining = [];
var trainingData = [];

var trainingOptions = {
  rate: .15,
  error: .005,
  iterations: 5000
};


User.findOne({ where: {id:21}})  // fixMe take in dynamic userID
.then(function(data) {
  //console.log(data);
  return data.getPhotos();
})
.then(function(photos) {
  var training = [];
  photos.map(function(photo) {
    var tueple = [[], 0, 0];
    if (photo.UserPhotos.dataValues.like === true) {
      if (photo.UserPhotos.dataValues.favorite === true) {
        tueple[1] = 1;
      } else {
        tueple[1] = .6;
      }
    } else if (photo.UserPhotos.dataValues.favorite === true ) {
      tueple[1] = .8;
    }
    tueple[2] = photo.PlaceId;
    training.push(tueple);
  });
  training.map(function(item) {
    Category.findAll({ attributes: ['name'], where: {PlaceId: 26} })
    .then(function(data) {
      console.log(data);
    });
  });
  console.log(training);
  return training;
})
.then(function(categories) {
  beforeTraining = categories;
});


// // old training data keeping until new feature works

// Category.aggregate('name', 'DISTINCT', { plain: false })
// .then(function(data) {
//   return data.map(function(DISTINCT) {
//     return DISTINCT.DISTINCT;
//   });
// })
// .then(function(category){
//   category.forEach(function(data){
//     trainingData.push(makeTraining(category.length));
//   });
//   Network = new Architect.Perceptron(category.length, Math.floor(category.length * .2),category.length);
//   return category;
// })
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

var makeTraining = function(n) {
  var newArray = Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
  var random = Math.random();


  newArray[Math.floor(Math.random()*newArray.length)] = .75;
  if( random > .33) {
    newArray[Math.floor(Math.random()*newArray.length)] = 1;
  }
  if( random > .6) {
    newArray[Math.floor(Math.random()*newArray.length)] = 1;
  }

  return {
    input: newArray,
    output: newArray
  };
};





// console.log(Network.activate([0, 1, 0, 1, 0]))