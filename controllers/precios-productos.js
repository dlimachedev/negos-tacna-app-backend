const { response } = require('express');
const pg = require('../database/pg-config');

const getProeciosProducto = async( req, res = response ) => {
  
  try {
    const { productoId } = req.params;
    const preciosProducto = await pg.query(
      `SELECT
        pp.producto_precio_id,
        pp.producto_id,
        pp.precio_id,
        p.descripcion AS precio_descripcion,
        pp.importe,
        pp.activo,
        CASE 
          WHEN pp.activo THEN 'ACTIVO'
          ELSE 'INACTIVO'
        END AS estado
      FROM maestros.productos_precios pp
      INNER JOIN maestros.precios p ON p.precio_id = pp.precio_id
      WHERE pp.producto_id = ${productoId}`
    );
    res.json({
      success: true,
      preciosProducto: preciosProducto.rows
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Hable con el administrador'
    });
  }
}

const crearPrecioProducto = async( req, res = response ) => {
  try {
    console.log(req.body);
    const { productoId, precioId, importe, activo } = req.body;
    const nuevoPrecioProducto = await pg.query(
     `INSERT INTO maestros.productos_precios(producto_id, precio_id, importe, activo)
     VALUES ( $1, $2, $3, $4 ) RETURNING *`,
     [ productoId, precioId, importe, activo ]
    );
    res.json({
      success: true,
      nuevoPrecioProducto:nuevoPrecioProducto.rows
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      msg: 'Hable con el administrador'
    });
  }
}

const actualizarPrecioProducto = async( req, res = response ) => {
 
}

module.exports = {
  getProeciosProducto,
  crearPrecioProducto,
  actualizarPrecioProducto,
}