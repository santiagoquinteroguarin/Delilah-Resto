// ROUTES CRUD
const { Router } = require('express');
const router = Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

// products - add product
router.post('/add', isAdmin, async (req, res) => {
    try {
        const { name, description, price, picture, is_avaliable } = req.body;
        const newProduct = {
            name,
            description,
            price,
            picture,
            is_avaliable,
        };
        const data = await pool.query('INSERT INTO products SET ?', [newProduct]);
        res.status(200).res.json({Message:"Product added", data});
    } catch (error) {
        res.status(400).res.json({Message:"verify the data and try again"});
    }
});

// all products
router.get('/', isLoggedIn, async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.status(200).res.json(products);
});

// one product
router.get('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        res.status(200).res.json(product);
    } catch (error) {
        res.status(400).res.json({Error:"the product you are looking for does not exist"});
    }
});

// delete product
router.delete('/delete/:id', isAdmin ,async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).res.json({Message:"Product deleted", product});
    } catch (error) {
        res.status(400).res.json({Error:"the product you are looking for does not exist"});
    }
});

// edit product
router.put('/edit/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, picture, is_avaliable } = req.body;
        const newProduct = {
            name,
            description,
            price,
            picture,
            is_avaliable,
        };
        const product = await pool.query('UPDATE products SET ? WHERE id = ?', [newProduct, id]);
        res.status(200).res.json({Message:"Product edited", product});
    } catch (error) {
        res.status(400).res.json({Error:"the product you are looking for does not exist or verify the data and try again"});
    }
});

module.exports = router;