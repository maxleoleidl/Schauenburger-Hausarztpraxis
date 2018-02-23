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

router.post('/submit', function(req, res, next) {
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

    /* read data */
    /* read data news */
    var news_headline = req.body.news_headline;
    var news_entry = eval('req.body.news_item');

    /* read data opening */
    var opening_headline = 'Öffnungseiten';
    var days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    var entries_opening =   [];
    var entries_surgery = [];

    /* read data medical team */

    for (var i = 0; i < 5; i++) {
        entries_opening.push({
            "id": i,
            "day": days[i],
            "times1": eval('req.body.opening_item1' + String(i)),
            "times2": eval('req.body.opening_item2' + String(i))
        });

        entries_surgery.push({
            "id": i,
            "day": days[i],
            "times1": eval('req.body.surgery_item1' + String(i)),
            "times2": eval('req.body.surgery_item2' + String(i))
        });
    };

    /* write data in the right form */
    /* write data in the right form news*/
    var news_output = JSON.stringify({
        "content": true,
        "entries":
        [
            {
                "headline": news_headline,
                "entry": news_entry
            }
        ]
    });

    /* write data in the right form opening*/
    var opening_output = JSON.stringify({
        "headline": opening_headline,
        "entries_opening": entries_opening,
        "entries_surgery": entries_surgery
    });

    /* backup files which changed */
    /* backup news file if changed */
    fs.readFile('public/sources/news.json', 'utf8', function(err, data) {
        if (data != news_output) {
            fs.writeFileSync('public/backup/' + folder_name + '/news.json', data);
        };
    });

    /* backup opening file if changed */
    fs.readFile('public/sources/opening_times.json', 'utf8', function(err, data) {
        if (data != opening_output) {
            fs.writeFileSync('public/backup/' + folder_name + '/opening_times.json', data);
        };
    });

    /* write news data to file */
    fs.writeFileSync('public/sources/news.json', news_output);
    fs.writeFileSync('public/sources/opening_times.json', opening_output);

    news_data_commit = JSON.parse(news_output).entries;
    opening_data_commit = JSON.parse(opening_output);

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