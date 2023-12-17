const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { pool } = require('./dbConfig');
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");


app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUnitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});


app.get('/', (req, res) => {
  res.send('CIDERE backend');
});

app.post('/review', (req, res) => {
  const data = req.body;
  // Inserción en PostgreSQL
  const query = 'INSERT INTO reviews (nombre, fecha, review, puntuacion) VALUES ($1, $2, $3, $4)';
  const values = [
    data.nombre, 
    data.fecha,
    data.review,
    data.puntuacion
  ];

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

//Lista de todas las noticias
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

//Recuperar noticia por id
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

//Insertar noticia
app.post('/noticia', async(req,res) =>{
  const {titulo, noticia, fecha, imagen} = req.body;


  try {
  
    const result = await pool.query(
      'INSERT INTO noticias(titulo, noticia, fecha, imagen) VALUES ($1,$2,$3,$4)',
      [titulo, noticia, fecha, imagen]
    );

    res.status(201).json({mensaje: "Noticia insertada correctamente"});

  } catch (error) {
    console.error('Error en la inserccion de noticia a la base de datos:', error);
    res.status(500).json({ error: 'Error al insertar la noticia el servidor' });
  }
});

app.put('/noticia/:id', async(req,res) =>{

  const idNoticia= req.params.id;
  
  const {titulo, noticia} = req.body;
  if (!titulo || !noticia|| titulo.trim() === '' || noticia.trim() === '') {
    return res.status(400).json({ error: 'Titulo y noticia son campos obligatorios.' });
  }
  try {
  
    const result = await pool.query("UPDATE noticias SET titulo = $1, noticia =$2 WHERE id = $3",[titulo, noticia,idNoticia]);
    res.status(200).json({ message: 'Noticia actualizada correctamente.'});

  } catch (error) {
    console.error('La pregunta no se puede editar o no existe', error);
    res.status(500).json({ error: 'La pregunta no se puede editar o no existe' });
  }
 
});

//Lista de mineras
app.get('/usuarios/mineras', async(req,res) =>{

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE tipo = 'minera'");
    const usuarios = result.rows[0];

    if (usuarios) {
      res.json(usuarios);
    } else {
      res.status(404).json({ error: 'No existen mineras' });
    }
  } catch (error) {
    console.error('Error en la consulta de mineras a la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/usuarios/registrarse', async (req,res) => {
  let  {rut , contraseña, contraseña2} = req.body;
  console.log({
    rut,
    contraseña,
    contraseña2
  });
  let errors = [];

  if(!rut || contraseña || contraseña2){
    errors.push({message: 'Por favor rellene todos los campos'})
  }

  if(contraseña!=contraseña2){
    errors.push({message: "Las contraseñas no coinciden"})
  }

  if(errors.length>0){
    res.send("Error")
  }else{
    let hashedPassword = await bcrypt.hash(contraseña, 10);
    pool.query("SELECT * FROM credenciales WHERE rut = $1",[rut], (err,results) => {
        if(err){
          throw err;
        }

        console.log(results.rows);

        if(results.rows.length>0){
          errors.push({message:" El rut ya se encuentra registrado"});
          //escribir errores en la pagina
        }else{
          pool.query("INSERT INTO credenciales (rut,contraseña) VALUES ($1, $2) RETURNING id, contraseña",
          [rut,hashedPassword],
          (err, results) => {
            if(err){
              throw err;
            }
            console.log()
          })
        }
    }
      
    )
  };


 

});


app.get('/preguntas', async(req,res) =>{

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE tipo = 'minera'");
    const usuarios = result.rows[0];

    if (usuarios) {
      res.json(usuarios);
    } else {
      res.status(404).json({ error: 'No existen mineras' });
    }
  } catch (error) {
    console.error('Error en la consulta de mineras a la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});





app.post('/chat/sendmessage', async(req,res) =>{

  const {usuario,mensaje} = req.body;

   // Query de inserción
   const query = 'INSERT INTO mensajes (usuario, mensaje) VALUES ($1, $2) RETURNING *';

   try {
     const result = await pool.query(query, [usuario, mensaje]);
 
     res.json({
       success: true,
       message: 'Inserción exitosa',
       data: result.rows[0], // Devuelve la fila insertada
     });

   } catch (error) {
     console.error('Error al insertar en PostgreSQL', error);
     res.status(500).json({
       success: false,
       message: 'Error al insertar en PostgreSQL',
       error: error.message,
     })
    }
 
});

app.get('/chat/getmessages', async(req,res) =>{

  try {
  
    const result = await pool.query('SELECT * FROM mensajes');
    const mensajes = result.rows;
    res.status(201).json({mensajes: mensajes });

  } catch (error) {
    console.error('Error en leer mensajes:', error);
    res.status(500).json({ error: 'Error en leer mensajes' });
  }
 
});



app.get('/FAQ', async(req,res) =>{

  try {
  
    const result = await pool.query('SELECT * FROM preguntas_respuestas');
    const FAQ = result.rows;
    res.status(201).json({FAQ: FAQ });

  } catch (error) {
    console.error('Error en leer las preguntas/respuestas:', error);
    res.status(500).json({ error: 'Error en leer preguntas/respuestas' });
  }
 
});


app.get('/FAQ/:id', async(req,res) =>{

  const idPregunta= req.params.id;

  try {
  
    const result = await pool.query("SELECT * FROM preguntas_respuestas WHERE id = $1", [idPregunta]);
    const FAQ = result.rows;
    res.status(201).json({FAQ: FAQ });

  } catch (error) {
    console.error('La pregunta no existe', error);
    res.status(500).json({ error: 'La pregunta no existe' });
  }
 
});


app.put('/FAQ/:id', async(req,res) =>{

  const idPregunta= req.params.id;
  
  const { pregunta, respuesta} = req.body;
  if (!pregunta || !respuesta || pregunta.trim() === '' || respuesta.trim() === '') {
    return res.status(400).json({ error: 'Pregunta y respuesta son campos obligatorios.' });
  }
  try {
  
    const result = await pool.query("UPDATE preguntas_respuestas SET pregunta = $1, respuesta =$2 WHERE id = $3",[pregunta,respuesta,idPregunta]);
    res.status(200).json({ message: 'Registro actualizado correctamente.'});

  } catch (error) {
    console.error('La pregunta no se puede editar o no existe', error);
    res.status(500).json({ error: 'La pregunta no se puede editar o no existe' });
  }
 
});




app.post('/FAQ', async(req,res) =>{

  const {pregunta,respuesta} = req.body;

   // Query de inserción
   const query = 'INSERT INTO preguntas_respuestas(pregunta,respuesta) VALUES ($1, $2) RETURNING *';

   try {
     const result = await pool.query(query, [pregunta,respuesta]);
 
     res.json({
       success: true,
       message: 'Inserción de la pregunta exitosa',// Devuelve la fila insertada
     });

   } catch (error) {
     console.error('Error al insertar la pregunta en PostgreSQL', error);
     res.status(500).json({
       success: false,
       message: 'Error al insertar la pregunta',
       error: error.message,
     })
    }

  });

app.delete('/FAQ/:id', async(req,res)=>{


    const idPregunta= req.params.id;
   
    try {
      const result = await pool.query('DELETE FROM preguntas_respuestas WHERE id = $1', [idPregunta]);
      
  
      if (res) {
        res.status(201).json({ mensaje: 'Pregunta borrada' });
      } else {
        res.status(404).json({ error: 'Pregunta no encontrada' });
      }
    } catch (error) {
      console.error('Error en la consulta de pregunta a la base de datos:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
 


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});