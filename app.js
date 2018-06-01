var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var flash = require('connect-flash');
var $ = require('jquery');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var fs = require('fs')

// Connect to database
mongoose.connect('mongodb://127.0.0.1/loginapp')
var db = mongoose.connection;

var render = require('./routes/render');
var admin = require('./routes/admin');
var users = require('./routes/users');

// Init app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use("/stylesheets",express.static(path.join(__dirname, "/stylesheets")));
app.use("/javascripts",express.static(path.join(__dirname, "/javascripts")));
app.use("/images",express.static(path.join(__dirname, "/images")));

// read state from file and send to frontend
app.get('/api', function(req, res) {
  fs.readFile('./stateFile.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Parsing state from file...')
      const state = JSON.parse(data)
      res.json(state)
    }
  })
})

// get state from frontend and write to file
app.post('/api', function(req, res) {
  state = req.body
  fs.writeFile('./stateFile.json', JSON.stringify(state), 'utf8', () => {
    console.log('Wrote state to file..')
    res.sendStatus(200)
  })
})

// Express session
app.use(expressSession({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  next();
});

app.use('/render', render);
app.use('/admin', admin);
app.use('/users', users);

// Static server
app.use(express.static('static'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Die Seite konnte nicht gefunden werden');
  err.status = 404;
  
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log();
    console.log('development error handler');
    console.log(err.status);
    console.log(err.message);

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });

    console.log();
  });
}

module.exports = app;
