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

router.use(ensureAuthenticated, express.static('static/admin'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;