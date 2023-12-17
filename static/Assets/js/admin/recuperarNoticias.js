$(document).ready(function () {
    let modoEdicion = false;

    $.ajax({
        url: 'http://paredes.myddns.me:5000/noticias',
        type: 'GET',
        success: function (response) {
            let noticias = response.noticias;
            console.log(noticias);
            let noticiasTable = $('#noticias-table tbody');

            // Itera sobre cada noticia y crea dinámicamente la fila de la tabla
            noticias.forEach(function (noticia, index) {
                let rowHtml = `
                    <tr>
                        <td class="text-truncate">${index + 1}</td>
                        <td class="text-truncate data-titulo">${noticia.titulo}</td>
                        <td class="text-truncate data-noticia">${noticia.noticia}</td>
                        <td><img src="../assets/img/noticias/${noticia.imagen}" alt="Noticia"></td>
                        <td align="center">
                            <button class="btn btn-success btn-default btn-editar" data-bs-toggle="modal" data-bss-tooltip="" title="Editar" type="button" data-bs-target="#modal-1"><i class="far fa-edit" title="Editar"></i></button>
                            <a class="btn btn-warning btn-ver" role="button" data-bs-toggle="tooltip" data-bss-tooltip="" title="Ver"><i class="far fa-eye" title="Ver"></i></a>
                            <a class="btn btn-danger btn-eliminar" role="button" data-bs-toggle="tooltip" data-bss-tooltip="" title="Eliminar"><i class="far fa-trash-alt" title="Eliminar"></i></a>
                        </td>
                    </tr>`;
                noticiasTable.append(rowHtml);
            });

            // Inicializa los tooltips después de agregar dinámicamente las filas
            $('[data-bs-toggle="tooltip"]').tooltip();
        },
        error: function (error) {
            console.log(error);
        }
    });

    // Manejo del clic en el botón de agregar nueva noticia
    $('.btn-agregar-noticia').on('click', function () {
        modoEdicion = false;
        limpiarModalNoticias();
        $('#modal-1').modal('show');
    });

    // Manejo del clic en el botón de editar
    $('#noticias-table').on('click', '.btn-editar', function () {
        modoEdicion = true;

        // Obtén la fila actual
        let fila = $(this).closest('tr');

        // Obtén la información de la noticia desde las celdas de la fila
        let titulo = fila.find('.data-titulo').text();
        let noticia = fila.find('.data-noticia').text();

        console.log(titulo);
        console.log(noticia);
        // Puedes obtener la URL de la imagen si la estás almacenando en una celda de la tabla

        // Llena los campos del modal con la información de la noticia seleccionada
        $('#modal-1 input').val(titulo);
        $('#modal-1 textarea').val(noticia);
        // Si tienes la URL de la imagen en una celda, ajusta el código para obtenerla y asignarla al campo de la imagen

        $('#modal-1').modal('show');
    });

    // Manejo del clic en el botón de guardar dentro del modal de noticias
    $('#modal-1').on('click', '.btn-guardar-noticia', function () {
        // Obtén los valores de los campos del modal
        let titulo = $('#modal-1 input[name="titulo"]').val();
        let descripcion = $('#modal-1 textarea[name="descripcion"]').val();
        // Obtén la URL de la imagen si estás almacenándola en un campo del modal

        if (modoEdicion) {
            // Realiza la solicitud PUT al servicio web para editar la noticia
            // ...
        } else {
            // Realiza la solicitud POST al servicio web para agregar una nueva noticia
            // ...
            // Después de agregar la noticia, puedes actualizar la tabla haciendo otra solicitud GET y llenando la tabla nuevamente
        }

        // Cierra el modal después de hacer la solicitud
        $('#modal-1').modal('hide');
    });

    // Función para limpiar los campos del modal de noticias
    function limpiarModalNoticias() {
        $('#modal-1 input').val('');
        $('#modal-1 textarea').val('');
        // Limpiar el campo de la imagen si lo tienes
        $('#modal-1 .subir').val(''); // Limpiar el campo de archivo
    }
    
});
