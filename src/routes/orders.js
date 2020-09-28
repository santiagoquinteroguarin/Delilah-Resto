// Authentications
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

// add order
router.post('/', isLoggedIn, async (req, res) => {
    const id_user = req.user.user.id;
    const id_product = req.products.products.id;
    const { id_payment_method } = req.body;
    const newOrder = {
        id_product,
        id_user,
        id_state,
        id_payment_method
    }
    const order = await pool.query('INSERT INTO orders SET ?)',[newOrder]);

    req.body.items.forEach(item => {
        pool.query('INSERT INTO order_details SET ?',[item.order, item.id_product, item.amount]);
    })
})

// all orders
router.get('/all', isAdmin, async (req, res) => {
    const allOrders = await pool.query(`SELECT pe.id, pe.estado, pe.fecha_hora, pr.producto, pp.cantidad, pr.precio, cl.usuario, cl.telefono, cl.direccion, cl.email, cl.nombre, cl.apellido, forma_pago.icon_pago
    FROM pedidos pe JOIN producto_pedido pp ON pe.id = pp.id_pedido
    JOIN clientes cl ON pe.id_cliente = cl.id 
    JOIN productos pr ON pp.id_producto = pr.id 
    JOIN forma_pago ON pe.id_pago = forma_pago.id
    JOIN imagenes ON pr.id_imagen = imagenes.id `, { type: sequelize.QueryTypes.SELECT })
    
    if(allOrders == ""){
        return res.status(400).json('No hay nada que mostrar.');
    }else { 
        res.status(200).json(allOrders)
    }
})

// one order
router.get('/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    const idUser = req.user.user.id;
    await pool.query('SELECT * FROM orders WHERE id = ? AND id_user = ?',[id, idUser]);
});

// edit order
router.put('/edit/:id', isAdmin, async (req, res) => {
    const id = req.params.id;
    const status = req.body;
    await pool.query('UPDATE orders SET state = ? WHERE id = ?',[status, id]);
});

// delete order
router.delete('/delete/:id', isAdmin, async (req, res) => {
    const id = req.params.id;
    const db = await pool.query(`SELECT * FROM pedidos WHERE id = ${id}`, { type: sequelize.QueryTypes.SELECT })
    if(db[0].estado == "Nuevo"){
        pool.query('DELETE FROM orders WHERE id = ?',[id]);
        pool.query('DELETE FROM order_details WHERE id_order = ?',[id]);
    }else {
        return res.status(400).json('No se puede eliminar un pedido ya en proceso, cambiar el estado a Cancelado');
    }
});

module.exports = router;