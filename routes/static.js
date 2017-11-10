var express = require('express');
var router = express.Router();
var path = require('path');

var menu_data = require('../public/sources/menu');
var opening_data = require('../public/sources/opening_times');
var news_data = require('../public/sources/news');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/index.html');
});

router.get('/team', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/medical_team.html');
});

router.get('/team/aerzteteam', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/medical_team.html');
});

router.get('/team/praxisteam', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/practice_team.html');
});

router.get('/leistungen', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/organisatorisches.html');
});

router.get('/leistungen/organisatorisches', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/organisatorisches.html');
});

router.get('/leistungen/grundversorgung', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/grundversorgung.html');
});

router.get('/leistungen/vorsorge', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/vorsorge.html');
});

router.get('/leistungen/chronische_erkrankungen', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/chronische_erkrankungen.html');
});

router.get('/leistungen/igel', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/igel.html');
});

router.get('/kontakt', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/contact.html');
});

router.post('/kontakt/submit', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();

  res.redirect('/kontakt');
});

router.get('/impressum', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/staticsites') + '/impressum.html');
});

module.exports = router;
