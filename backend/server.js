const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'cidere',
  host: 'localhost',
  database: 'cidere',
  password: 'cidere123',
  port: 4321 // El puerto por defecto de PostgreSQL es 5432
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

app.get('/noticias',(req,res) =>{
  const query = 'SELECT * FROM noticias';

   pool.query(query, (error,result) => {
    if (error) {
      console.error('Error al realizar la consultar las noticias en PostgreSQL:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud de noticias' });
    } else {
      // Los resultados de la consulta están en la propiedad 'rows'
      const noticias = result.rows;
      console.log('Consulta de noticias exitosa en PostgreSQL');
      res.status(200).json({ noticias: noticias });
    }
   });
});

app.get('/noticias/:id', async(req,res) =>{
  const idNoticia= req.params.id;
  
  try {
    const result = await pool.query('SELECT * FROM noticias WHERE id = $1', [idNoticia]);
    const noticia = result.rows[0];

    if (noticia) {
      res.json(noticia);
    } else {
      res.status(404).json({ error: 'Noticia no encontrada' });
    }
  } catch (error) {
    console.error('Error en la consulta de noticia a la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});