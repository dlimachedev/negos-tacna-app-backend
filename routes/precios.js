/*
    Product Routes
    /api/precios
*/
const { Router } = require('express');

const { getPrecios } = require('../controllers/precios');

const router = Router();

// Obtener precios 
router.get('/', getPrecios );

module.exports = router;