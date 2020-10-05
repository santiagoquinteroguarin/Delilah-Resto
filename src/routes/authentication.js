// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin, verifyAdmin, verifyUser, isUser } = require('../lib/auth');

const jwt = require('jsonwebtoken');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.send('SignUp');
});

//Sign Up
// router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: false,
// }));

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', { session: false }), async(req, res, next) => { 
    res.json({
        message: "Sign Up Successful",
        user: req.user,
    })
});

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.json({signIn: "SignIn - Login"});
});

// Sign In - Validation
// router.post('/signin', isNotLoggedIn, (req, res, next) => {
//     passport.authenticate('local.signin', {
//         successRedirect: '/profile',
//         failureRedirect: '/signin'
//     })(req, res, next);
// });

router.post('/signin', async (req, res, next) => {
    passport.authenticate('local.signin', async (err, user, info) => {
        try {
            req.login(user, { session: false }, async (err) => {
                if (err) {
                    return next(err)
                }
                const body = { _id: user.username, password: user.password }
                const token = jwt.sign({ user: body }, 'top_secret');
                return res.json({ token })
            })
        }
        catch(e) {
            return next(e)
        }
    })(req, res, next)
})

// profile
// router.get('/profile', isLoggedIn, async (req, res) => {
//     try {
//         const id_user = req.user.id;
//         const data = await pool.query('SELECT * FROM users WHERE id = ?', [id_user]);
//         res.status(200);
//         res.json(data);
//     } catch (error) {
//         res.status(500);
//         res.json({Error:"Internal Server Error"});
//     }
// });

router.get('/profile', isUser, async (req, res, next) => {
    const data = await pool.query('SELECT * FROM users WHERE username = ?',[req.user.user._id]);
    res.json({
        data,
        message: 'You did it!'
    })
})

// LogOut
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;