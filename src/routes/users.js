// ROUTES CRUD
const { Router } = require('express');
const router = Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Users - add user
router.post('/add', async (req, res) => {
    const { fullname, username, email, phone, address, password, is_admin } = req.body;
    const newUsers = {
        fullname,
        username,
        email,
        phone,
        address,
        password,
        is_admin
    };
    await pool.query('INSERT INTO users SET ?', [newUsers]);
});

module.exports = router;