/*
    Product Routes
    /api/preciosproductos
*/
const { Router } = require('express');

const { getProeciosProducto, crearPrecioProducto, actualizarPrecioProducto } = require('../controllers/precios-productos');

const router = Router();

// Obtener los precios de un producto por id 
router.get('/:productoId', getProeciosProducto );

// Crear un nuevo precio para un producto
router.post('/', crearPrecioProducto );

// Actualizar el precio de un producto
router.put('/:productoId', actualizarPrecioProducto );

module.exports = router;