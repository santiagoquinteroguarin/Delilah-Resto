// Authentications

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');



module.exports = router;