// Authentications
const { Router } = require('express');
const router = Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

// add order
router.post('/add', isLoggedIn, async (req, res) => {
    // generate order
    try {
        // get id user
        const id_user = req.user.id;
        const { id_payment_method } = req.body;
        const newOrder = {
            id_user,
            id_payment_method
        }

        // generate order
        await pool.query('INSERT INTO orders SET ?', [newOrder]);

        // add order details
        const searchIdOrder = await pool.query('SELECT * FROM orders WHERE id_user = ?',[id_user]);
        const id_order = searchIdOrder[0].id;

        req.body.products.forEach(async item => {
            const id_product = item.id_product;
            const amount = item.amount;
            const newOrderDetails = {
                id_order,
                id_product,
                amount,
            }
            await pool.query('INSERT INTO order_details SET ?', [newOrderDetails]);
        })

        res.status(200).json('Order added');
    } catch (error) {
        res.status(400).json('verify the data and try again');
    }
});

// all orders
router.get('/', isAdmin, async (req, res) => {
    const data = await pool.query(`
    SELECT orders.id , status.state, orders.order_date, order_details.amount, products.name AS product, products.description, payment_method.description AS payment_method,products.price, users.username, users.fullname, users.address, users.phone_number, users.email 
    FROM orders 
    INNER JOIN order_details ON orders.id = order_details.id 
    INNER JOIN products ON order_details.id_product = products.id 
    INNER JOIN users ON orders.id_user = users.id 
    INNER JOIN payment_method ON orders.id_payment_method = payment_method.id 
    INNER JOIN status ON orders.id_state = status.id`);

    (data == "") ? res.status(400).json('There are no orders to show') : res.status(200).json(data);
});

// one order
router.get('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const id_user = req.user.id;
    const data = await pool.query(`
        SELECT orders.id , status.state, orders.order_date, order_details.amount, products.name AS product, products.description, payment_method.description AS payment_method,products.price, users.username, users.fullname, users.address, users.phone_number, users.email 
        FROM orders 
            INNER JOIN order_details ON orders.id = order_details.id 
            INNER JOIN products ON order_details.id_product = products.id 
            INNER JOIN users ON orders.id_user = users.id 
            INNER JOIN payment_method ON orders.id_payment_method = payment_method.id 
            INNER JOIN status ON orders.id_state = status.id
        WHERE orders.id = ? AND users.id = ?`,[id, id_user]);

    (data == "") ? res.status(400).json('the order you are looking for does not exist in the system') : res.status(200).json(data);
});

// update order
router.put('/edit/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;
        await pool.query('UPDATE orders SET id_state = ? WHERE id = ?', [state, id]);
        res.status(200).res.json({
            state:"Order Updated"
        });
    } catch (error) {
        res.status(400).res.json({
            Failed:"The order you are looking for does not exist"
        });
    }
    
});

// delete order
router.delete('/delete/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM orders WHERE id = ?`, [id]);
    if(data[0].id_state === 1){
        await pool.query('DELETE FROM orders WHERE id = ?', [id]);
        await pool.query('DELETE FROM order_details WHERE id = ?', [id]);
        res.status(200).res.json({
            order:"Order Deleted"
        });
    }else {
        return res.status(400).json('You cannot delete an order already in process, change the status to canceled');
    }
});

module.exports = router;