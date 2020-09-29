// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

// all users
router.get('/', isAdmin, async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.status(200).res.json(users);
});

// one user
router.get('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        res.status(200).res.json(user);
    } catch (error) {
        res.status(400).res.json({Error:"the user you are looking for does not exist"});
    }
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
        const data = await pool.query('UPDATE users SET ? WHERE id = ?', [editUser, id]);
        res.status(200).res.json(data);
    } catch (error) {
        res.status(400).res.json({Error:"verify the data and try again"});
    }
});

// delete user
router.delete('/delete/:id', isLoggedIn ,async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(200).res.json({message:"User Deleted"});
    } catch (error) {
        res.status(400).res.json({Error:"the user you are looking for does not exist"});
    }
});

module.exports = router;