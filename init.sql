  
\c cidere;        

CREATE TABLE reviews(
id SERIAL PRIMARY KEY,
fecha date,
review varchar(255),
puntuacion int
);   

INSERT INTO reviews(fecha, review, puntuacion) VALUES ('2023-01-01', 'Muy bueno, primer comentario', 5);