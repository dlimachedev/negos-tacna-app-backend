const { response } = require('express');
const pg = require('../database/pg-config');

const getUnidadesMedida = async( req, res = response ) => {
  try {
    const unidadesMedida = await pg.query('select * from maestros.unidades_medida where activo');
    res.json({
      success: true,
      unidadesMedida: unidadesMedida.rows
    });
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getUnidadesMedida,
}