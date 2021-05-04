const { response } = require('express');
const pg = require('../database/pg-config');

const getProductos = async( req, res = response ) => {
  try {
    const productos = await pg.query(`
    SELECT
      p.producto_id,
      p.codigo,
      p.descripcion,
      p.descripcion_corta,
      p.unidad_medida_id,
      um.descripcion AS unidad_medida_descripcion,
      p.ubicacion,
      p.activo,
      CASE 
        WHEN p.activo THEN 'ACTIVO'
        ELSE 'INACTIVO'
      END AS estado
    FROM maestros.productos p
    INNER JOIN maestros.unidades_medida um on um.unidad_medida_id = p.unidad_medida_id
    ORDER BY p.activo DESC;
    `);
    res.json({
      success: true,
      productos: productos.rows
    });
  } catch (error) {
    console.error(error)
  }
}

const getProducto = async( req, res = response ) => {
  try {
    const { productoId } = req.params;
    const producto = await pg.query('SELECT * FROM maestros.productos WHERE producto_id = $1', [ productoId ]);
    res.json({
      success: true,
      producto: producto.rows
    });
  } catch (error) {
    console.error(error)
  }
}

const crearProducto = async( req, res = response ) => {
  try {
    console.log(req.body);
    const { codigo, descripcion, descripcionCorta, unidadMedidaId, ubicacion, activo } = req.body;
    const nuevoProducto = await pg.query(
     `INSERT INTO maestros.productos(codigo, descripcion, descripcion_corta, unidad_medida_id, ubicacion, activo)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
     [ codigo, descripcion, descripcionCorta, unidadMedidaId, ubicacion, activo ]
    );
    res.json({
      success: true,
      nuevoProducto:nuevoProducto.rows
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      msg: 'Hable con el administrador'
    });
  }
}

const actualizarProducto = async( req, res = response ) => {
  try {
    const { productoId } = req.params;
    const { codigo, descripcion, descripcionCorta, unidadMedidaId, ubicacion, activo } = req.body;
    const acProducto = await pg.query(
      `UPDATE maestros.productos
      SET 
        codigo = $1, 
        descripcion = $2, 
        descripcion_corta = $3, 
        unidad_medida_id = $4, 
        ubicacion = $5,
        activo = $6
      WHERE producto_id = $7`,
     [ codigo, descripcion, descripcionCorta, unidadMedidaId, ubicacion, activo, productoId ]
    );
    res.json({
      success: true,
      msg: 'Producto Actualizado Correctamente'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      msg: 'Hable con el administrador'
    });
  }
}

module.exports = {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
}