  
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


