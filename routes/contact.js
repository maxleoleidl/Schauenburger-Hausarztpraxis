var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var contact_data = require('../public/sources/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Kontakt', menu: menu_data, menu_active: 'kontakt', contact: contact_data, map: true});
});

module.exports = router;
