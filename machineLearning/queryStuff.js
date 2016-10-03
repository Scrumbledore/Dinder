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

var categoryKeys = {};
var categoryNums = {};
var synapticTrainingData = [];

var trainingOptions = {
  rate: 0.2,
  error: 0.005,
  iterations: 10000
};

var findIndicesOfMax = function(inp, count) {
  var outp = [];
  var sortF = function(a, b) { return inp[b] - inp[a]; };
  for (var i = 0; i < inp.length; i++) {
    outp.push(i);
    if (outp.length > count) {
      outp.sort(sortF);
      outp.pop();
    }
  }
  return outp;
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
.then(function(trainingObj) {
  Category.aggregate('name', 'DISTINCT', { plain: false })
  .then(function(data) {

    var keyObj = data.reduce(function(o, v, i) {
      o[v.DISTINCT] = i;
      return o;
    }, {});
    keyObj.length = data.length - 1;
    categoryKeys = keyObj;

    var numObj = data.reduce(function(o, v, i) {
      o[i] = v.DISTINCT;
      return o;
    }, {});
    categoryNums = numObj;

    return keyObj;
  })
  .then(function(categoryObj) {
    //console.log(categoryObj, trainingObj);
    trainingObj.forEach(function(userRating) {
      var newArray = Array.apply(null, Array(categoryObj.length)).map(Number.prototype.valueOf, 0);
      userRating.category.forEach(function(categoryRating) {
        newArray[categoryObj[categoryRating]] = userRating.weight;
      });
      synapticTrainingData.push({
        input: newArray,
        output: newArray
      });
    });
    return categoryObj;
  })
  .then(function(makeTraining) {
    Network = new Architect.Perceptron(makeTraining.length, Math.floor(makeTraining.length * 0.2), makeTraining.length);
    Network.trainer.train(synapticTrainingData, trainingOptions);

    var newArray = Array.apply(null, Array(makeTraining.length)).map(Number.prototype.valueOf, 0);
    var count = 0;
    while(count < 3) {
      var random = Math.random();
      newArray[Math.floor(Math.random()*newArray.length)] = .6;
      count++;
    }

    var x = Network.activate(newArray);
    var y = findIndicesOfMax(x, 3);
    console.log(categoryNums[y[0]],categoryNums[y[1]],categoryNums[y[2]]);
  });
});

// var promise = new Promise(function(resolve, reject) {
//   var p = Category.aggregate('name', 'DISTINCT', { plain: false })
//   .then(function(data) {

//     var obj = data.reduce(function(o, v, i) {
//       o[v.DISTINCT] = i;
//       return o;
//     }, {});
//     obj.length = data.length - 1;
//     return obj;
//   });

//   if (p) {
//     resolve(p);
//   }
//   else {
//     reject(Error("It broke"));
//   }
// });




// // old training data keeping until new feature works

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
  //  var random = Math.random();


  // newArray[Math.floor(Math.random()*newArray.length)] = .75;
  // if( random > .33) {
  //   newArray[Math.floor(Math.random()*newArray.length)] = 1;
  // }
  // if( random > .6) {
  //   newArray[Math.floor(Math.random()*newArray.length)] = 1;
  // }

//   return {
//     input: newArray,
//     output: newArray
//   };
// };





// console.log(Network.activate([0, 1, 0, 1, 0]))