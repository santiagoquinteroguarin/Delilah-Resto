// Authentications
const { Router } = require('express');
const router = Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, verifyAdmin, isUser } = require('../lib/auth');

// add order
router.post('/add', isUser, async (req, res) => {
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

        // search order
        const searchIdOrder = await pool.query('SELECT MAX(id) FROM orders WHERE id_user = ?',[id_user]);
        const id_order = Object.values(searchIdOrder[0].valueOf('MAX(id)'));

        // add order details
        req.body.products.forEach(async item => {
            const id_product = item.id_product;
            const amount = item.amount;
            const newOrderDetails = {
                id_order,
                id_product,
                amount,
            }
            await pool.query('INSERT INTO order_details SET ?', [newOrderDetails]);
        });

        res.status(200);
        res.json({Message:'Order added'});
    } catch (error) {
        res.status(400);
        res.json({Message:'verify the data and try again'});
    }
});

// all orders
router.get('/', verifyAdmin, async (req, res) => {
    const data = await pool.query(`
    SELECT orders.id , status.state, orders.order_date, order_details.amount, products.name AS product, products.description, payment_method.description AS payment_method,products.price, users.username, users.fullname, users.address, users.phone_number, users.email 
    FROM orders 
    INNER JOIN order_details ON orders.id = order_details.id 
    INNER JOIN products ON order_details.id_product = products.id 
    INNER JOIN users ON orders.id_user = users.id 
    INNER JOIN payment_method ON orders.id_payment_method = payment_method.id 
    INNER JOIN status ON orders.id_state = status.id`);

    if(data == ""){
        res.status(204);
        res.json({Message:'There are no orders to show'});
    } else {
        res.status(200);
        res.json(data);
    }
});

// one order
router.get('/:id', verifyAdmin, async (req, res) => {
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

    if(data == "") {
        res.status(204);
        res.json({Message:'the order you are looking for does not exist in the system'});
    } else {
        res.status(200);
        res.json(data);
    } 
});

// update order
router.put('/edit/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;
        const data = await pool.query('SELECT * FROM orders WHERE id = ?',[id]);
        if(data == "") {
            res.status(204);
            res.json({Message:"The order you are looking for does not exist"});
        } else {
            await pool.query('UPDATE orders SET id_state = ? WHERE id = ?', [state, id]);
            res.status(200);
            res.json({state:"Order Updated"});
        }
    } catch (error) {
        res.status(500);
        res.json({Error:"Internal Server Error"});
    }
});

// delete order
router.delete('/delete/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM orders WHERE id = ?`, [id]);
    if(data == "") {
        res.status(204);
        res.json({Message:"The order you are looking for does not exist"});
    } else {
        if(data[0].id_state === 1){
            await pool.query('DELETE FROM orders WHERE id = ?', [id]);
            await pool.query('DELETE FROM order_details WHERE id = ?', [id]);
            res.status(200);
            res.json({order:"Order Deleted"});
        }else {
            res.status(400);
            res.json({Message:"You cannot delete an order already in process, change the status to canceled"});
        }
    }
});

module.exports = router;