var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var app = express();



// Connection URI
var uri = 'mongodb://david:ba88el@ds027718.mongolab.com:27718/gerryfudd';
// declare global variables for the database and the collection
var database;
var collection;

// initialize connection

MongoClient.connect(uri, function (err, db) {
	assert.equal(null, err);
	if (err) throw err;

	database = db;
	collection = db.collection('products');

	app.listen(5000);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  findProducts(database, function (docs) {
	  res.json({"products": docs});
  });
});

// adds new comments to an existing product
router.post('/addComment', function(req, res) {
	var product = req.body.product;
	var comment = req.body.comment;
  
  modifyProduct(database, {
  	"product": product,
  	"comment": comment
  }, function (result) {
  	res.json(result);
  });
});

// adds new comments to an existing product
router.post('/addProduct', function(req, res) {
	var name = req.body.productName;
	var cost = req.body.productCost;
	var description = req.body.productDescription;
	
  insertProduct(database, [{
  	"name": name,
  	"cost": cost,
  	"description": description,
  	"comments": []
  }], function (product) {
	  res.json(product);
  });
});

function insertProduct (db, data, callback) {
  // Insert some documents
  collection.insert(data, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted into the products collection:");
    console.dir(data);
    callback(data);
  });
}

function findProducts (db, callback) {
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following products:");
    console.dir(docs);
    callback(docs);
  });      
}

function modifyProduct (db, data, callback) {
  // Update document where a is 2, set b equal to 1
  collection.update({ name :  data.product.name}
    , { $addToSet: {
    	comments : data.comment
    } }, function(err, result) {
    assert.equal(err, null);
    console.log("Added comment " + data.comment + " to " + data.name + ".");
    callback(data.product);
  });  
}

module.exports = router;