const { response } = require('express');
const pg = require('../database/pg-config');

const getPrecios = async( req, res = response ) => {
  try {
    const precios = await pg.query('SELECT * FROM maestros.precios where activo');
    res.json({
      success: true,
      precios: precios.rows
    });
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getPrecios,
}