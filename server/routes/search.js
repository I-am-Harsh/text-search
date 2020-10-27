var express = require('express');
var router = express.Router();
var Content = require('../models/content');

/* GET users listing. */
router.get('/', (req, res, next) => {
    Content.find({ $text : {
        $search : req.query.text
    }}).lean()
    .then(result => {
        console.log(result)
        res.json({success : true, data : result})
    })
    .catch(err => console.log(err))
})


module.exports = router;
