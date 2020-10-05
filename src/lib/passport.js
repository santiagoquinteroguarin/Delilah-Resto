// Method Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

// object configuration - SignIn
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true, //pasar el request
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    // Encontro usuario
    if(rows.length > 0) {
        const user = rows[0];
        // mandar en el orden que se configuro - validation
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword) {
            done(null, user, { Message: 'Login Successful'});
        } else {
            done(null, false, { Message: 'Wrong Password'});
        }
    } else {
        return done(null, false, {Message:'User not found'});
    }
}));

// object configuration - SignUp
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true, //pasar el request
}, async (req, username, password, done) => {
    const { fullname, email, phone_number, address, is_admin } = req.body;
    const newUser = {
        username,
        fullname,
        email,
        phone_number,
        address,
        password,
        is_admin,
    };
    // Encriptar password
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

// Iniciar - guardar la sesion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializar la session - tomar ese id para obtener nuevamente los datos
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});