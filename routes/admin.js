var express = require('express');
var bodyParser = require('body-parser');
var router = express();
var hbs = require('handlebars');
var fs = require('fs');
var mkdirp = require('mkdirp');
var mongo = require('mongodb');
var assert = require('assert');

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.use(bodyParser.json());

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
  var folder_name =
    year + '_' + month + '_' + day + '-' + hour + '-' + minute + '-' + second;
  mkdirp('public/backup/' + folder_name, function(err) {});

  /* write data in the right form opening*/
  var opening_output = JSON.stringify({
    headline: opening_headline,
    entries_opening: entries_opening,
    entries_surgery: entries_surgery,
  });

  /* backup files which changed */
  /* backup news file if changed */
  /*
  fs.readFile('public/sources/news.json', 'utf8', function(err, data) {
    if (data != news_output) {
      fs.writeFileSync('public/backup/' + folder_name + '/news.json', data);
    }
  });*/

  /* backup opening file if changed */
  /*fs.readFile('public/sources/opening_times.json', 'utf8', function(err, data) {
    if (data != opening_output) {
      fs.writeFileSync(
        'public/backup/' + folder_name + '/opening_times.json',
        data
      );
    }
  });*/

  /* write news data to file */
  /*fs.writeFileSync('public/sources/news.json', news_output);
  fs.writeFileSync('public/sources/opening_times.json', opening_output);

  news_data_commit = JSON.parse(news_output).entries;*/
  opening_data_commit = JSON.parse(opening_output);

  res.redirect('/render');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;