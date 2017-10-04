var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var $ = require('jquery');

var index = require('./routes/index');
var praxisteam = require('./routes/practice_team');
var aerzteteam = require('./routes/medical_team');
var leistungen = require('./routes/leistungen');
var contact = require('./routes/contact');
var impressum = require('./routes/impressum');
var news = require('./routes/news');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/home', index);
app.use('/team', praxisteam);
app.use('/praxisteam', praxisteam);
app.use('/team/praxisteam', praxisteam);
app.use('/aerzteteam', aerzteteam);
app.use('/team/aerzteteam', aerzteteam);
app.use('/leistungen', leistungen);
app.use('/kontakt', contact);
app.use('/impressum', impressum);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
