/*
    Product Routes
    /api/unidades-medida
*/
const { Router } = require('express');

const { getUnidadesMedida } = require('../controllers/unidades-medida');

const router = Router();

// Obtener uniades de medida 
router.get('/', getUnidadesMedida );

module.exports = router;