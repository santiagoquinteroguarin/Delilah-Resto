// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');

//Sign Up
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
}));

// Sign In - Validation
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
});

// profile
router.get('/profile', (req, res) => {
    res.send('Este es tu profile');
});

// LogOut
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;