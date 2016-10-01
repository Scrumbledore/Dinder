var synaptic = require('synaptic');
var s = require('sequelize');
var Architect = synaptic.Architect;
var Network;
var Category = require('../server/database/models/category.js');
var userPhotos = require('../server/database/models/userPhotos.js');
var photo = require('../server/database/models/photo.js');
var place = require('../server/database/models/place.js');
var User = require('../server/database/models/user.js');
var handler = require('../server/handlers/userHandler.js');
var connection = require('../server/database/database.js');
require('../server/database/joins.js')(connection);
var trainingData = [
];

var trainingOptions = {
  rate: .15,
  error: .005,
  iterations: 5000
};


// // Make training data array part 1.
Category.aggregate('name', 'DISTINCT', { plain: false })
.then(function(data) {
  return data.map(function(DISTINCT) {
    return DISTINCT.DISTINCT;
  });
})
.then(function(category){
  category.forEach(function(data){
    trainingData.push(makeTraining(category.length));
  });
  Network = new Architect.Perceptron(category.length, Math.floor(category.length * .2),category.length);
  return category;
})
.then(function(train){
  Network.trainer.train(trainingData,trainingOptions);
  //log margin of error
  return train;
})
.then(function(data){
  var testObject = makeTraining(data.length);
  var returnItems = [];
  console.log(Network.activate(testObject.input));
  for(var i = 0; i < testObject.input.length; i++){
    if( testObject.input[i] > 0) {
      returnItems.push({
        category: data[i],
        chance: testObject.input[i]
      });
    }
  }
  console.log(returnItems);
});

// User.findOne({ where: {id:3}})
// .then(function(data) {
//   return data.getPhotos();
// })
// .then(function(photos) {
//   photos.forEach(function(photo){
//     console.log(photo.UserPhotos,'$$$$$$$$$$$$$$$$' +photo.PlaceId);
//   })

// })
// Photo.findOne({})
// .then(function(photo){
//   console.log(photo);
// })

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