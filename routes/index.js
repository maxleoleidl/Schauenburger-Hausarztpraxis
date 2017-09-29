var express = require('express');
var router = express.Router();
// var fs = require('fs');

// var data = fs.readFileSync('public/sources/opening_times.json', 'utf8');
var data = require('../public/sources/opening_times');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schauenburger Hausarztpraxis', opening_times: data });
});

module.exports = router;
