$(document).ready(function () {
    let modoEdicion = false; // Variable de control para saber si se está editando o no

    // Cargar los datos de la tabla al cargar la página
    $.ajax({
        url: "http://paredes.myddns.me:5000/faq",
        type: "GET",
        dataType: "json",
        success: function (data) {
            // Manejo de datos para la sección de administrador (tabla)
            let adminTable = $('.admin-faq-table tbody');

            console.log(data.FAQ);

            data.FAQ.forEach(function (pregunta, index) {
                let rowHtml = `
                    <tr>
                        <td class="text-truncate data-id" style="max-width: 200px;" data-id-faq="${pregunta.id}" id="${index + 1}">${index + 1}</td>
                        <td class="text-truncate data-pregunta" style="max-width: 200px;">${pregunta.pregunta}</td>
                        <td class="text-truncate data-respuesta" style="max-width: 200px;">${pregunta.respuesta}</td>
                        <td align="center">
                            <button class="btn btn-success btn-default btn-editar" data-bs-toggle="modal" data-bss-tooltip="" title="Editar" type="button" data-bs-target="#modal-1"><i class="far fa-edit" title="Editar"></i></button>
                            <a class="btn btn-danger btn-eliminar" role="button" data-bs-toggle="tooltip" data-bss-tooltip="" title="Eliminar"><i class="far fa-trash-alt" title="Eliminar"></i></a>
                        </td>
                    </tr>`;
                adminTable.append(rowHtml);
            });
            

            // Manejo de datos para la página en general (modal)
            let generalAccordion = $('#faqlist');

            data.FAQ.forEach(function (pregunta, index) {
                let accordionHtml = `
                    <div class="accordion-item">
                        <h2 class="accordion-header"><button class="btn accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#content-accordion-${index + 1}">${pregunta.pregunta}</button></h2>
                        <div id="content-accordion-${index + 1}" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                            <p class="accordion-body">${pregunta.respuesta}</p>
                        </div>
                    </div>`;
                generalAccordion.append(accordionHtml);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });

    // Manejo del clic en el botón de agregar nueva FAQ
    $('.btn-agregar-faq').on('click', function () {
        modoEdicion = false; // Establecer modo a agregar
        limpiarModal();
        $('#modal-1').modal('show');
    });
    
    // Manejo del clic en el botón de guardar dentro del modal
    $('#modal-1').on('click', '.btn-guardar', function () {
        // Obtén los valores de los campos del modal
        let pregunta = $('#modal-1 .data-pregunta').val();
        let respuesta = $('#modal-1 textarea').val();

        if (modoEdicion) {
            // Realiza la solicitud PUT al servicio web para editar
            // Realiza la solicitud PUT al servicio web

            // Obtén el ID del FAQ que deseas editar
            let idFaq = $('#modal-1').attr('data-id-faq');

            $.ajax({
                url: "http://paredes.myddns.me:5000/faq/" + idFaq, // Reemplaza con la URL y el ID del FAQ específico
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    pregunta: pregunta,
                    respuesta: respuesta
                }),
                success: function (response) {
                    // Maneja la respuesta exitosa si es necesario
                    console.log(response);

                    // Actualiza la fila de la tabla
                    let fila = $(`#admin-faq-table tbody tr #${idFaq}`).closest('tr');
                    fila.find('.data-pregunta').text(pregunta);
                    fila.find('.data-respuesta').text(respuesta);

                    // sweetalert2
                    Swal.fire({
                        icon: 'success',
                        title: 'FAQ actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                },
                error: function (error) {
                    // Maneja el error si es necesario
                    console.log(error);
                }
            });

        } else {
            // Realiza la solicitud POST al servicio web para agregar nueva FAQ
            // ...
            // Realiza la solicitud POST al servicio web
            $.ajax({
                url: "http://paredes.myddns.me:5000/faq", // Reemplaza con la URL y el ID del FAQ específico
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    pregunta: pregunta,
                    respuesta: respuesta
                }),
                success: function (response) {
                    // Maneja la respuesta exitosa si es necesario
                    console.log(response);

                    // Obtener el último ID de la tabla y sumar 1
                    let idFaq = $('.admin-faq-table tbody tr:last-child .data-id').text();
                    idFaq = parseInt(idFaq) + 1;

                    // Agrega una nueva fila a la tabla
                    let adminTable = $('.admin-faq-table tbody');
                    let rowHtml = `
                        <tr>
                            <td class="text-truncate data-id" style="max-width: 200px;" data-id-faq="${idFaq}">${idFaq}</td>
                            <td class="text-truncate data-pregunta" style="max-width: 200px;">${pregunta}</td>
                            <td class="text-truncate data-respuesta" style="max-width: 200px;">${respuesta}</td>
                            <td align="center">
                                <button class="btn btn-success btn-default btn-editar" data-bs-toggle="modal" data-bss-tooltip="" title="Editar" type="button" data-bs-target="#modal-1"><i class="far fa-edit" title="Editar"></i></button>
                                <a class="btn btn-danger btn-eliminar" role="button" data-bs-toggle="tooltip" data-bss-tooltip="" title="Eliminar"><i class="far fa-trash-alt" title="Eliminar"></i></a>
                            </td>
                        </tr>`;
                    adminTable.append(rowHtml);

                    // sweetalert2
                    Swal.fire({
                        icon: 'success',
                        title: 'FAQ agregado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                },
                error: function (error) {
                    // Maneja el error si es necesario
                    console.log(error);
                }
            });
        }

        // Cierra el modal después de hacer la solicitud
        $('#modal-1').modal('hide');
    });

    // Manejo del clic en el botón de editar
    $('.admin-faq-table').on('click', '.btn-editar', function () {
        modoEdicion = true; // Establecer modo a editar

        // Obtén la fila actual
        let fila = $(this).closest('tr');
        
        // Extrae la información del FAQ desde los atributos de datos
        let idFaq = fila.find('.data-id').text();
        
        let pregunta = fila.find('.data-pregunta').text();
        let respuesta = fila.find('.data-respuesta').text();

        // Almacena el ID en el atributo de datos de la modal
        $('#modal-1').attr('data-id-faq', idFaq);

        // Llena los campos del modal con la información del FAQ seleccionado
        $('#modal-1 input').val(pregunta);
        $('#modal-1 textarea').val(respuesta);

        // Abre el modal
        $('#modal-1').modal('show');
    });

    // Limpia los campos del modal cuando se cierra completamente
    $('#modal-1').on('hidden.bs.modal', function () {
        $('#modal-1 input').val('');
        $('#modal-1 textarea').val('');
    });

    // Función para limpiar los campos del modal
    function limpiarModal() {
        $('#modal-1 input').val('');
        $('#modal-1 textarea').val('');
    }

    // Manejo del clic en el botón de eliminar
    $('.admin-faq-table').on('click', '.btn-eliminar', function () {
        // sweetalert2 para confirmar la eliminación
        Swal.fire({
            title: '¿Está seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Obtén la fila actual
                let fila = $(this).closest('tr');
                
                // Obtén el ID del FAQ que deseas eliminar
                let idFaq = fila.find('.data-id').text();

                // Realiza la solicitud DELETE al servicio web
                $.ajax({
                    url: "http://paredes.myddns.me:5000/faq/" + idFaq, // Reemplaza con la URL y el ID del FAQ específico
                    type: 'DELETE',
                    success: function (response) {
                        // Maneja la respuesta exitosa si es necesario
                        console.log(response);

                        // sweetalert2
                        Swal.fire({
                            icon: 'success',
                            title: 'FAQ eliminado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // Elimina la fila de la tabla
                        fila.remove();
                    },
                    error: function (error) {
                        // Maneja el error si es necesario
                        console.log(error);
                    }
                });
            }
        });

    });
});
