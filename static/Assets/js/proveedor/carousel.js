<!-- Agrega este script al final de tu documento HTML, después de incluir la biblioteca Bootstrap -->

  // Obtén el elemento del carousel por su id
  var carousel = document.getElementById('carouselMultiItemExample');

  // Inicializa el carousel utilizando el objeto Carousel de Bootstrap
  var carouselInstance = new bootstrap.Carousel(carousel);

  // Agrega un evento click al botón de anterior
  document.querySelector('.carousel-control-prev').addEventListener('click', function() {
    carouselInstance.prev(); // Mueve el carousel a la diapositiva anterior
  });

  // Agrega un evento click al botón de siguiente
  document.querySelector('.carousel-control-next').addEventListener('click', function() {
    carouselInstance.next(); // Mueve el carousel a la siguiente diapositiva
  });

