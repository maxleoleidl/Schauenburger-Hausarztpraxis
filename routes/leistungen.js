var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var services_data = require('../public/sources/services');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('leistungen', { title: 'Leistungen', menu: menu_data, menu_active: 'leistungen', services: services_data, map: false});
});

module.exports = router;
