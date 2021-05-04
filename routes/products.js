/*
    Product Routes
    /api/productos
*/
const { Router } = require('express');

const { getProductos, getProducto, crearProducto, actualizarProducto } = require('../controllers/products');

const router = Router();

// Obtener productos 
router.get('/', getProductos );

// Obtener un producto por id 
router.get('/:productoId', getProducto );

// Crear un nuevo producto
router.post('/', crearProducto );

// Actualizar producto
router.put('/:productoId', actualizarProducto );

module.exports = router;