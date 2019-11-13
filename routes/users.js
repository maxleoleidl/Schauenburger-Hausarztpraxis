var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/login', function(req, res) {
    res.render('login');
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