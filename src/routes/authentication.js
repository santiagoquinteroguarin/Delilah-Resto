// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.send('SignUp');
});

//Sign Up
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.json({signIn: "SignIn"});
});

// Sign In - Validation
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
});

// profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.json({profile: 'profile'});
});

// LogOut
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;