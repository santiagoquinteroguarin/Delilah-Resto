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
    }
}