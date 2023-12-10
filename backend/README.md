
# Backend marketplace CIDERE

## 1) Instalar dependencias

Para instalar las dependencias

```bash
  npm install
```


## 2) Ejecutar servidor

### npm

```bash
  npm start
```

### nodemon


```bash
  nodemon server.js
```

## Endpoints

### Comentarios
#### GET
`Lista de todos los comentarios:` [/reviews](localhost:5000/reviews)

### respuesta:
```
   "reviews": [
        {
            "id": 1,
            "fecha": "2023-01-01T04:00:00.000Z",
            "review": "Muy bueno, primer comentario",
            "puntuacion": 5
        }
   ]
```

#### POST
`Insertar comentario:` [/review](localhost:5000/review)

#### Parametros:

| nombre      | obligatorio| tipo        |
|-------------|------------| ------------|
| fecha       | si         | date        |
| review      | si         | varchar(255)|
| puntuacion  | si         | int         |


### Noticias
#### GET
`Lista de todas las noticias:` [/noticias](localhost:5000/noticias)

#### Parametros:

| nombre      | obligatorio| tipo        |
|-------------|------------| ------------|
| titulo      | si         | varchar(255)|
| noticia     | si         | TEXT        |
| fecha       | si         | date        |
| imagen      | si         | varchar(50) |


#### GET
`Noticia con ID:` [/noticias/id](localhost:5000/noticias/id)

#### Parametros:

`/id`: identificador de la noticia

Los mismos que la peticion anterior

### respuesta:
```
   "noticias": [
        {
            "id": 1,
            "titulo": "Alianza Histórica entre Empresas Mineras y Comunidades Locales en Coquimbo",
            "noticia": "En un esfuerzo por fortalecer los lazos entre la industria...",
            "fecha": "2023-01-01T00:00:00.000Z",
            "imagen": "Perfil 1.jpg"
        }
    ]
```