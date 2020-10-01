// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

// all users
router.get('/', isAdmin, async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.status(200);
        res.json(users);
    } catch (error) {
        if(res.status(403)) {
            res.status(403);
            res.json({Message:"user does not have access to this resource to one that is authenticated"});
        } else {
            res.status(500);
            res.json({Error:"Internal Server Error"});
        }
    }
});

// one user
router.get('/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if(user == "") {
            res.status(404);
            res.json({Error:"the user you are looking for does not exist"});
        } else {
            res.status(200);
            res.json(user);
        }
        
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
});

// edit user
router.put('/edit/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const id_user = req.user.id;
        if(id_user == id) {
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
            res.status(200);
            res.json({Message:"User Edited"});
        } else {
            res.status(403);
            res.json({Message:"You are not authorized to do this type of operation with this id"});
        }
    } catch (error) {
        res.status(400);
        res.json({Error:"Internal Server Error"});
    }
});

// delete user
router.delete('/delete/:id', isAdmin ,async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if(data == "") {
            res.status(400);
            res.json({Message:"the user you are looking for does not exist"});
        } else {
            await pool.query('DELETE FROM users WHERE id = ?', [id]);
            res.status(200);
            res.json({message:"User Deleted"});
        }
        
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
});

module.exports = router;