// ROUTES CRUD
const { Router } = require('express');
const router = Router();
const pool = require('../database');

// products - add product
router.post('/add', async (req, res) => {
    const { name, description, price, picture, is_avaliable } = req.body;
    const newProduct = {
        name,
        description,
        price,
        picture,
        is_avaliable
    };
    await pool.query('INSERT INTO products SET ?', [newProduct]);
    res.send('agregado');
});

// products
router.get('/', async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.json(products);
});

// delete product
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const product = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.send('Eliminado');
});

router.put('/edit/:id', async (req, res) => {
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
    res.send('actualizado');
});

module.exports = router;