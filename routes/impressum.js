var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var contact_data = require('../public/sources/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('impressum', { title: 'Impressum', menu: menu_data, contact: contact_data, map: false});
});

module.exports = router;
