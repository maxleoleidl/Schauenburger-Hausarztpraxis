var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var news_data = require('../public/sources/news');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('news', { title: 'Aktuelles', menu: menu_data, news: news_data, map: false});
});

module.exports = router;
