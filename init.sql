  
\c cidere;        

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    nombre varchar(255),
    fecha date,
    review varchar(255),
    puntuacion int
);   

INSERT INTO reviews(nombre,fecha, review, puntuacion) VALUES ('Minerales del Valle','2023-01-01', 'Muy bueno, primer comentario', 5);


CREATE TABLE noticias(
    id SERIAL PRIMARY KEY,
    titulo varchar(255),
    noticia TEXT,
    fecha date,
    imagen varchar(50)
);

INSERT INTO noticias(titulo, noticia, fecha, imagen) VALUES ('Alianza Histórica entre Empresas Mineras y Comunidades Locales en Coquimbo', 'En un esfuerzo por fortalecer los lazos entre la industria minera y las comunidades locales, varias empresas mineras líderes en Coquimbo han formado una alianza estratégica. Esta iniciativa busca promover la responsabilidad social empresarial y el desarrollo sostenible en la región. Se planean proyectos conjuntos que beneficiarán tanto a las empresas como a las comunidades, marcando un hito en la colaboración entre el sector minero y la sociedad.','2023-01-01','Perfil 1.jpg');
INSERT INTO noticias(titulo, noticia, fecha, imagen) VALUES ('Alianza Histórica entre Empresas Mineras y Comunidades Locales en Coquimbo', 'En un esfuerzo por fortalecer los lazos entre la industria minera y las comunidades locales, varias empresas mineras líderes en Coquimbo han formado una alianza estratégica. Esta iniciativa busca promover la responsabilidad social empresarial y el desarrollo sostenible en la región. Se planean proyectos conjuntos que beneficiarán tanto a las empresas como a las comunidades, marcando un hito en la colaboración entre el sector minero y la sociedad.','2023-02-01','Perfil 2.jpg');
INSERT INTO noticias(titulo, noticia, fecha, imagen) VALUES ('Alianza Histórica entre Empresas Mineras y Comunidades Locales en Coquimbo', 'En un esfuerzo por fortalecer los lazos entre la industria minera y las comunidades locales, varias empresas mineras líderes en Coquimbo han formado una alianza estratégica. Esta iniciativa busca promover la responsabilidad social empresarial y el desarrollo sostenible en la región. Se planean proyectos conjuntos que beneficiarán tanto a las empresas como a las comunidades, marcando un hito en la colaboración entre el sector minero y la sociedad.','2023-03-01','Perfil 3.jpg');
INSERT INTO noticias(titulo, noticia, fecha, imagen) VALUES ('Alianza Histórica entre Empresas Mineras y Comunidades Locales en Coquimbo', 'En un esfuerzo por fortalecer los lazos entre la industria minera y las comunidades locales, varias empresas mineras líderes en Coquimbo han formado una alianza estratégica. Esta iniciativa busca promover la responsabilidad social empresarial y el desarrollo sostenible en la región. Se planean proyectos conjuntos que beneficiarán tanto a las empresas como a las comunidades, marcando un hito en la colaboración entre el sector minero y la sociedad.','2023-04-01','Perfil 4.jpg');

CREATE TYPE tipo_usuarios AS ENUM ('administrador', 'minera', 'proveedor');

CREATE TABLE mensajes(
    id SERIAL NOT NULL,
    usuario VARCHAR(50),
    mensaje TEXT
); 


CREATE TABLE usuarios(
    id SERIAL NOT NULL,
    tipo tipo_usuarios,
    rut INT PRIMARY KEY NOT NULL,
    contraseña varchar(200) NOT NULL,
    nombre_empresa varchar(50) NOT NULL,
    razon_social varchar(50),
    direccion varchar(50),
    informacion TEXT,
    rubros TEXT,
    comuna TEXT,
    actividades TEXT,
    representante TEXT,
    servicios TEXT,
    proyectos TEXT,
    certificaciones TEXT,
    pagina varchar(50),
    imagen varchar(50),
    UNIQUE (rut)
);

INSERT INTO usuarios(tipo, rut, contraseña, nombre_empresa, razon_social, direccion, informacion, rubros, comuna, actividades, representante, servicios , proyectos, certificaciones, pagina) VALUES (
   'minera',
   123456789,
   '123',
   'Minerales del Valle',
   'Minera', 
   'Arica',
   'Informacion sobre la empresa', 
   'rubros','comuna','actividades','representantes',
   'servicios',
   'protectos',
   'certificaciones',
   'www.mineralesdelvalle.cl'
   );


CREATE TABLE credenciales (
    id SERIAL NOT NULL,
    rut INT PRIMARY KEY REFERENCES usuarios(rut),
    contraseña VARCHAR(255) NOT NULL
);


INSERT INTO credenciales(rut, contraseña) VALUES (123456789, '123');


CREATE TABLE preguntas_respuestas(
    id SERIAL NOT NULL,
    pregunta TEXT,
    respuesta TEXT
);

INSERT INTO preguntas_respuestas(pregunta,respuesta) VALUES ('¿Qué es CIDERE?','CIDERE es una corporación dedicada a promover y facilitar la colaboración entre empresas mineras en la región de Coquimbo, Chile. Nos enfocamos en crear un espacio industrial minero donde las empresas pueden encontrar proveedores y servicios de manera eficiente.');
INSERT INTO preguntas_respuestas(pregunta,respuesta) VALUES ('¿Cómo puedo utilizar el Espacio Industrial Minero de CIDERE?','Para utilizar nuestro espacio, simplemente visita la página principal y utiliza el buscador. Ingresa el tipo de proveedor o servicio que necesitas, y nuestro sistema te conectará con empresas mineras de la región.');
INSERT INTO preguntas_respuestas(pregunta,respuesta) VALUES ('¿Es gratuito utilizar el servicio de búsqueda en CIDERE?','Sí, el servicio de búsqueda en el Espacio Industrial Minero de CIDERE es completamente gratuito. Queremos facilitar la conexión entre empresas mineras y proveedores en la región.');
INSERT INTO preguntas_respuestas(pregunta,respuesta) VALUES ('¿Cómo puedo registrarme como proveedor en CIDERE?','Si eres un proveedor que desea ser parte de nuestro espacio, puedes registrarte en el botón "Registrarse" en la esquina superior derecha de nuestra página, o también contáctanos a través de la sección de contacto. Estaremos encantados de discutir las oportunidades de colaboración.');
INSERT INTO preguntas_respuestas(pregunta,respuesta) VALUES ('¿Qué tipo de empresas puedo encontrar en el Espacio Industrial Minero?','En nuestro espacio, puedes encontrar una amplia variedad de empresas mineras y proveedores de servicios relacionados. Desde servicios de maquinaria hasta consultoría especializada, nuestro objetivo es abarcar todas las necesidades de la industria minera en Coquimbo.');


