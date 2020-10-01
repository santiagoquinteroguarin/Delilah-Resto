// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.send('SignUp');
});

//Sign Up
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: false,
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.json({signIn: "SignIn - Login"});
});

// Sign In - Validation
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
});

// profile
router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const id_user = req.user.id;
        const data = await pool.query('SELECT * FROM users WHERE id = ?', [id_user]);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
    
});

// LogOut
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;