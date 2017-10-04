var express = require('express');
var router = express.Router();

var menu_data = require('../public/sources/menu');
var team_data = require('../public/sources/practice_team');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('practice_team', { title: 'Unser Praxisteam', menu: menu_data, menu_active: 'team praxisteam', team: team_data, map: false});
});

module.exports = router;
