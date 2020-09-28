const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');

// Initializations
const app = express();
require('./lib/passport');

// settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(session({
    secret: 'delilahrestomysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
})

// Routes
// ------- home
app.use(require('./routes/index'));
// ------- Authentication
app.use(require('./routes/authentication'));
// ------- Products
app.use('/products', require('./routes/products'));
// ------- Users
app.use('/users', require('./routes/users'));
// ------- Orders
app.use('/orders', require('./routes/orders'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});