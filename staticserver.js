var html = require('html');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var $ = require('jquery');

var static = require('./routes/static');

// Init app
var app = express();

// View engine setup
app.set('view engine', 'html');

app.use(logger('dev'));

app.use(express.static('static'))

// Favicon
app.use(favicon(path.join(__dirname, 'static', 'images', 'icon.ico')));

app.use('/', static);

module.exports = app;
