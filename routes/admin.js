var express = require('express');
var router = express();
var hbs = require('handlebars');
var fs = require('fs');
var mongo = require('mongodb');
var assert = require('assert');

/* Load data from json files */
var opening_data = require('../public/sources/opening_times');
var news_data = require('../public/sources/news');
var medical_data = require('../public/sources/medical_team');
var practice_data = require('../public/sources/practice_team');
var services_data = require('../public/sources/services');
var contact_data = require('../public/sources/contact');

var data_commit = news_data.entries;

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('admin', {title: "Administration", data: data_commit});
});

router.post('/submit', function(req, res, next) {
    /* backup the source files */
    fs.readFile('public/sources/news.json', 'utf8', function(err, data) {
        fs.writeFileSync('public/backup/news.json', data);
    });

    /* read data */
    var headline = req.body.headline;
    var items = [];
    var i = 0;

    while (i < 100) {
        try {
            var item = eval('req.body.item_' + i);
            if (item != null) {
                items.push.apply(items, [{"id": i, "entry": item}]);
            };
        } catch(err) {
            i = 100;
        };

        i++;
    };

    /* write data in the right form */
    var output = JSON.stringify({
        "content": true,
        "entries":
        [
            {
                "headline": headline,
                "items": items
            }
        ]
    });

    /* write data to file */
    fs.writeFileSync('public/sources/news.json', output);

    data_commit = JSON.parse(output).entries;

    res.redirect('/render');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;