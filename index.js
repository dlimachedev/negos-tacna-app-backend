const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/productos', require('./routes/products') );
app.use('/api/precios-productos', require('./routes/precios-productos') );
app.use('/api/precios', require('./routes/precios') );
app.use('/api/unidades-medida', require('./routes/unidades-medida') );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});