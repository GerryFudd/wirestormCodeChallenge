var express = require('express');
var router = express.Router();

// This data mimics the data that would be stored in a database.
// If I had more time, I would set up a database and access this information through
// calls to a database.
var data = [
  {'name': 'Product 1',
   'description': 'This is the first product',
   'comments': []
  },
  {'name': 'Product 2',
   'description': 'This is the second product',
   'comments': []
  },
  {'name': 'Product 3',
   'description': 'This is the third product',
   'comments': []
  }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({"products": data});
});

// adds new comments to an existing product
router.post('/addComment', function(req, res) {
	var newComment = req.body.comment;
	var product = data[req.body.ind];
	product.comments.push(newComment);
	res.json(newComment);
});

module.exports = router;