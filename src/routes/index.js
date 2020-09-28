// Todas las rutas principales
const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

router.get('/', (req, res) => {
    res.json({
        home:"home",
    });
});

module.exports = router;