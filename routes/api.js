var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');



// Connection URL
var url = 'mongodb://david:ba88el@ds027718.mongolab.com:27718/gerryfudd';
// Use connect method to connect to the Server

// This data mimics the data that would be stored in a database.
// If I had more time, I would set up a database and access this information through
// calls to a database.
// var data = [
//   {'name': 'Product 1',
//    'cost': 3,
//    'description': 'This is the first product',
//    'comments': []
//   },
//   {'name': 'Product 2',
//    'cost': 5,
//    'description': 'This is the second product',
//    'comments': []
//   },
//   {'name': 'Product 3',
//    'cost': 12,
//    'description': 'This is the third product',
//    'comments': []
//   }
// ];

/* GET users listing. */
router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findProducts(db, function (docs) {
		  res.json({"products": docs});
	  	db.close();
	  });
	});

});

// adds new comments to an existing product
router.post('/addComment', function(req, res) {
	var newComment = req.body.comment;
	var product = data[req.body.ind];
	product.comments.push(newComment);
	res.json(newComment);
});

// adds new comments to an existing product
router.post('/addProduct', function(req, res) {
	var name = req.body.productName;
	var cost = req.body.productCost;
	var description = req.body.productDescription;
	
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertProduct(db, [{
	  	"name": name,
	  	"cost": cost,
	  	"description": description,
	  	"comments": []
	  }], function (product) {
		  res.json(product);
	  	db.close();
	  });
	});
});

function insertProduct (db, data, callback) {
  // Get the documents collection
  var collection = db.collection('products');
  // Insert some documents
  collection.insert(data, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted into the products collection:");
    console.dir(data);
    callback(data);
  });
}

function findProducts (db, callback) {
  // Get the documents collection
  var collection = db.collection('products');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following products:");
    console.dir(docs);
    callback(docs);
  });      
}

module.exports = router;