// Todas las rutas principales
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        home:"home",
    });
});

module.exports = router;