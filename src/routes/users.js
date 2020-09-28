// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

// all users
router.get('/', isAdmin, async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.json(users);
});

// one user
router.get('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json(user);
});

// edit user
router.put('/edit/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, fullname, email, phone_number, address, password, is_admin } = req.body;
        const editUser = {
            username,
            fullname,
            email,
            phone_number,
            address,
            password,
            is_admin,
        };
        await pool.query('UPDATE users SET ? WHERE id = ?', [editUser, id]);
        res.json({
            state: "edited user - success",
            editUser
        });
    } catch (error) {
        res.json({
            state:"failed",
            check:"verify the data and try again",
        });
    }
});

// delete user
router.delete('/delete/:id', isLoggedIn ,async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            state: "Deleted user - success"
        });
    } catch (error) {
        res.json({
            state:"failed",
            message:"The user does not exists"
        });
    }
});

module.exports = router;