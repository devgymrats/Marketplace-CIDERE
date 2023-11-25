$(document).ready(function () {
    // Al hacer clic en el enlace, cargar el contenido del modal.html en el modal
    $("#openModal").click(function () {
      $("#modalFaq").load("Modal-faq.html", function () {
        // Después de cargar el contenido, mostrar el modal
        $("#modalFaq").modal("show");
      });
    });
  });