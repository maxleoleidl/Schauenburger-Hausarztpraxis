var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var team_data = require('../public/sources/medical_team');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('medical_team', { title: 'Ihr Ärzteteam', menu: menu_data, menu_active: 'team aerzteteam', team: team_data, map: false});
});

module.exports = router;
