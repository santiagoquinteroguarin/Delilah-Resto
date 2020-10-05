// ROUTES CRUD
const { Router } = require('express');
const router = Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin, isUser, verifyAdmin } = require('../lib/auth');

const passport = require('passport');

// products - add product
router.post('/add', verifyAdmin, async (req, res) => {
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
        res.status(200);
        res.json({Message:"added product"});
    } catch (error) {
        res.status(400);
        res.json({Error:"verify the data and try again"});
    }
});

// all products
router.get('/', isUser, async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    if(products == "") {
        res.status(204);
        res.json({Message:"no products in the database"});
    } else {
        res.status(200);
        res.json(products);
    }
});

// one product
router.get('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if(product == "") {
            res.status(404);
            res.json({Message:"the product you are looking for does not exist"});
        } else {
            res.status(200);
            res.json(product);
        }
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
});

// delete product
router.delete('/delete/:id', verifyAdmin ,async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if(data == "") {
            res.status(404);
            res.json({Message:"the product you are looking for does not exist"});
        } else {
            const product = await pool.query('DELETE FROM products WHERE id = ?', [id]);
            res.status(200);
            res.json({Message:"Product deleted"});
        }
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
});

// edit product
router.put('/edit/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if(data == "") {
            res.status(404);
            res.json({Error:"the product you are looking for does not exist or verify the data and try again"});
        } else {
            const { name, description, price, picture, is_avaliable } = req.body;
            const newProduct = {
                name,
                description,
                price,
                picture,
                is_avaliable,
            };
            const product = await pool.query('UPDATE products SET ? WHERE id = ?', [newProduct, id]);
            res.status(200);
            res.json({Message:"Product edited"});
        }
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
});

module.exports = router;