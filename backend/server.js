const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'cidere',
  host: '127.0.0.1',
  database: 'cidere',
  password: 'cidere123',
  port: 5432 // El puerto por defecto de PostgreSQL es 5432
});

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/', (req, res) => {
  res.send('CIDERE backend');
});

app.post('/review', (req, res) => {
  const data = req.body;
  // Inserción en PostgreSQL
  const query = 'INSERT INTO reviews (fecha, review, puntuacion) VALUES ($1, $2, $3)';
  const values = [data.fecha,data.review,data.puntuacion];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al insertar en PostgreSQL:', error);
      res.status(500).json({ error: 'Error al procesar la insercion' });
    } else {
      console.log('Inserción exitosa en PostgreSQL');
      res.status(200).json({ mensaje: 'Datos insertados con éxito' });
    }
  });
});

app.get('/reviews', (req, res) => {
  // Consulta SELECT *
  const query = 'SELECT * FROM reviews';

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error al realizar la consulta en PostgreSQL:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    } else {
      // Los resultados de la consulta están en la propiedad 'rows'
      const reviews = result.rows;
      console.log('Consulta exitosa en PostgreSQL:', reviews);
      res.status(200).json({ reviews: reviews });
    }
  });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});