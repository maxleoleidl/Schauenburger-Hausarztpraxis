var express = require('express');
var router = express();
var hbs = require('handlebars');
var fs = require('fs');

/* Load data from json files */
var opening_data = require('../public/sources/opening_times');
var news_data = require('../public/sources/news');
var medical_data = require('../public/sources/medical_team');
var practice_data = require('../public/sources/practice_team');
var services_data = require('../public/sources/services');
var contact_data = require('../public/sources/contact');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('admin', {title: "Administration"});
});

module.exports = router;