var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

// delete this section on the server
router.post('/register', function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validation
    req.checkBody('name', 'Bitte geben sie einen Namen an.').notEmpty();
    req.checkBody('username', 'Bitte geben sie einen Benutzernamen an').notEmpty();
    req.checkBody('password', 'Bitte geben sie ein Passwort ein.').notEmpty();
    req.checkBody('password2', 'Die von ihnen eingegebenen Passwörter stimmen nicht überein.').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors:errors
        });
    } else {
        var newUser = new User({
            name: name,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user) {
            if(err) {throw err};
        });

        req.flash('success_msg', 'Der Benutzer wurde erfolgreich angelegt. Sie können sich jetzt anmelden.');

        res.redirect('/users/login');
    };
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user) {
            return done(null, false, {message: 'Unbekannter Benutzer'});
        }

        User.comparePassword(password, user.password, function(err, isMatch) {
            if(err) throw err;
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Passwort nicht gültig'});
            }
        })
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/admin', failureRedirect:'/users/login', badRequestMessage : 'Es wurden keine oder zu wenig Daten eingegeben', failureFlash: true}),
    function(req, res) {
        res.redirect('/admin');
});

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Sie haben sich erfolgreich abgemeldet.');

	res.redirect('/users/login');
});

module.exports = router;