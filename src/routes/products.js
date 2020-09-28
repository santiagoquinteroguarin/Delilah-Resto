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
        await pool.query('INSERT INTO products SET ?', [newProduct]);
        res.json({
            state:"success",
            newProduct,
        });
    } catch (error) {
        res.json({
            state:"failed",
            check:"verify the data and try again",
        });
    }
});

// all products
router.get('/', isLoggedIn, async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.json(products);
});

// one product
router.get('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    res.json(product);
});

// delete product
router.delete('/delete/:id', isAdmin ,async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({
            state: "Deleted - success"
        });
    } catch (error) {
        res.json({
            state:"failed",
            message:"The product does not exists"
        });
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
        await pool.query('UPDATE products SET ? WHERE id = ?', [newProduct, id]);
        res.json({
            state: "edited - success",
            newProduct
        });
    } catch (error) {
        res.json({
            state:"failed",
            check:"verify the data and try again",
        });
    }
});

module.exports = router;