var express = require('express');
var router = express.Router();
var Content = require('../models/content');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
})

.get('/all', (req, res, next) => {
	Content.find({}).lean().then(result => {
		res.json({data : result})
	})
})

// insert bulk data in form of array
.post('/bulk/insert', (req, res, next) => {
	const data = req.body;
	Content.insertMany(data)
	.then(result => {
		res.json({success : true});
	})
	.catch(err => next(err))
})

module.exports = router;
