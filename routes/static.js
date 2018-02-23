var express = require('express');
var router = express.Router();
var path = require('path');

var menu_data = require('../public/sources/menu');
var contact_data = require('../public/sources/contact');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/index.html');
});

router.get('/team', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/medical_team.html');
});

router.get('/team/aerzteteam', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/medical_team.html');
});

router.get('/team/praxisteam', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/practice_team.html');
});

router.get('/leistungen', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/organisatorisches.html');
});

router.get('/leistungen/organisatorisches', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/organisatorisches.html');
});

router.get('/leistungen/grundversorgung', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/grundversorgung.html');
});

router.get('/leistungen/vorsorge', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/vorsorge.html');
});

router.get('/leistungen/chronische_erkrankungen', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/chronische_erkrankungen.html');
});

router.get('/leistungen/igel', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/igel.html');
});

router.get('/kontakt', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/contact.html');
});

/*
router.get('/kontakt', function(req, res, next) {
  res.render('contact', {title: 'Kontakt', email: req.session.email, success: req.session.success, errors: req.session.errors, menu: menu_data, menu_active: 'kontakt', contact: contact_data, map: true});
});
*/

router.get('/impressum', function(req, res) {
  res.sendFile(path.join(__dirname, '../static') + '/impressum.html');
});

module.exports = router;
