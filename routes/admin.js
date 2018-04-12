var express = require('express');
var router = express();
var hbs = require('handlebars');
var fs = require('fs');
var mkdirp = require('mkdirp');
var mongo = require('mongodb');
var assert = require('assert');

/* Load data from json files */
var opening_data = require('../public/sources/opening_times');
var news_data = require('../public/sources/news');
var medical_data = require('../public/sources/medical_team');
var practice_data = require('../public/sources/practice_team');
var services_data = require('../public/sources/services');
var contact_data = require('../public/sources/contact');

var news_data_commit = news_data.entries;
var opening_data_commit = opening_data;
var medical_data_commit = medical_data;

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('admin', {
        title: "Administration",
        news_data: news_data_commit,
        opening_data: opening_data_commit,
        medical_data: medical_data_commit
    });
});

router.post('/submit', ensureAuthenticated, function(req, res, next) {
    /* get date and time */
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    /* create folder for backup */
    var folder_name = year + '_' + month + '_' + day + '-' + hour + '-' + minute + '-' + second
    mkdirp('public/backup/' + folder_name, function(err) {});

    res.redirect('/render');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;