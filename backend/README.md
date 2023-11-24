
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