const pool = require('../database');
const jwt = require('jsonwebtoken');


module.exports = {
    // validation login
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/signin');
        }
    },

    // proceso inverso - si el usuari ya inicio session 
    isNotLoggedIn(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },

    // validation admin
    isAdmin(req, res, next) {
        if (req.isAuthenticated() && (req.user.is_admin === 1)) {
            return next();
        }
        return res.redirect('/');
    },

    async verifyAdmin(req, res, next) {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const verifyToken = jwt.verify(token, 'top_secret');
            if(verifyToken){
                req.user = verifyToken;
                const data = await pool.query('SELECT * FROM users WHERE username = ?',[req.user.user._id])
                if(data[0].is_admin === 1){
                    return next()
                } else{ 
                    return res.json({error: 'only administrators are authorized'});
                }
            }
        } catch (err){
            return res.json({error: 'error user not valid'})
        }
    },

    isUser(req, res, next) {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const verifyToken = jwt.verify(token, 'top_secret');
            if(verifyToken){
                req.user = verifyToken;
                return next()
            }
        } catch (err){
            return res.json({error: 'error user not valid'});
        }
    }
}