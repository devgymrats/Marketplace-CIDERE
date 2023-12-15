/////////////////////////// TODO RELACIONADO CON MODAL CONEXIONES ////////////////////////////////////

// Al apretar el botón conectar con el proveedor
function conectar() {
    Swal.fire({
        title: 'Escribir a esta empresa',
        input: 'textarea',
        inputPlaceholder: 'Escriba su mensaje aquí...',
        html: '<small>Sugerencias:</small><br>' +
            '<small class="text-muted">- Presentarse y explicar el motivo de la conexión</small><br>' +
            '<small class="text-muted">- Dejar sus datos de contacto</small>',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor escriba un mensaje'
            }
        },
        confirmButtonText: 'Conectar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#808080',
        showCloseButton: true,
        focusConfirm: false,
    }).then((result) => {
        if (result.value) {
            fetch('', {
                method: 'PUT',
                body: JSON.stringify({
                    body: result.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(json => console.log(json))

            Swal.fire(
                'Mensaje enviado',
                'Gracias por escribirnos, en breve nos pondremos en contacto con usted',
                'success'
            )
        }
    })
}

// Rechazar una solicitud de conexión y elimina el card de la lista de pendientes
$('.conexion-rechazar').click(function () {
    Swal.fire({
        title: '¿Está seguro?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCloseButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            // obtener id de la card donde se dio click
            var id = $(this).closest('.card').attr('id');
            // eliminar card
            $('#' + id).remove();
            // eliminar solicitud
            fetch('', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(json => console.log(json))

            Swal.fire(
                'Cancelada',
                'La solicitud ha sido cancelada',
                'success'
            )
        }
    })
})

// Aceptar una solicitud de conexión y elimina el card de la lista de pendientes
$('.conexion-aceptar').click(function () {
    Swal.fire({
        title: '¿Está seguro?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            // obtener id de la card donde se dio click
            var id = $(this).closest('.card').attr('id');
            // eliminar card
            $('#' + id).remove();
            // eliminar solicitud
            fetch('', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(json => console.log(json))

            Swal.fire(
                'Aceptada',
                'La solicitud ha sido aceptada',
                'success'
            )
        }
    })
})

function addCardPendientes(data) {
    // crear las nuevas cards
    for (var i = 0; i < data.pendientes; i++) {
        var id = data[i].id;
        var img = data[i].img;
        var nombre = data[i].nombre;
        var link = data[i].link;
        var mensaje = data[i].mensaje;

        // agregar las cards al modal sección pendientes
        $('#pendientes').append('<div id="' + id + '" class="card pendiente"">' +
            '<img id="conexion-img" class="card-img-top w-100 d-block" src="' + img + '" loading="lazy" />' +
            '<div class="card-body"><a href="' + link + '">' +
            '<h4 class="card-title">' + nombre + '</h4> </a>' +
            '<p class="card-text">' + mensaje + '</p>' +
            '<div class="btn-group" role="group"><button class="btn btn-primary conexion-aceptar" type="button">Aceptar</button>' +
            '<button class="btn btn-danger conexion-rechazar" type="button">Rechazar</button></div>' +
            '</div></div>');
    }
}

function addCardAceptadas(data) {
    // crear las nuevas cards
    for (var i = 0; i < data.aceptadas; i++) {
        var id = data[i].id;
        var img = data[i].img;
        var nombre = data[i].nombre;
        var link = data[i].link;
        var mensaje = data[i].mensaje;

        // agregar las cards al modal sección pendientes
        $('#aceptadas').append('<div id="' + id + '" class="card aceptada"">' +
            '<img id="conexion-img" class="card-img-top w-100 d-block" src="' + img + '" loading="lazy" />' +
            '<div class="card-body"><a href="' + link + '">' +
            '<h4 class="card-title">' + nombre + '</h4> </a>' +
            '<p class="card-text">' + mensaje + '</p>' +
            '<button class="btn btn-link" type="button">Ir a la conversación<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">' +
            '<path d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z" fill="currentColor"></path>' +
            '<path d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z" fill="currentColor"></path>' +
            '</svg></button>' +
            '<button class="btn btn-link remove" type="button">Remover<i class="far fa-trash-alt"></i></button>' +
            '</div></div>');
    }

}

function addCardRechazadas(data) {
    for (var i = 0; i < data.rechazadas; i++) {
        var id = data[i].id;
        var img = data[i].img;
        var nombre = data[i].nombre;
        var link = data[i].link;
        var mensaje = data[i].mensaje;

        // agregar las cards al modal sección pendientes
        $('#rechazadas').append('<div id="' + id + '" class="card rechazada"">' +
            '<img id="conexion-img" class="card-img-top w-100 d-block" src="' + img + '" loading="lazy" />' +
            '<div class="card-body"><a href="' + link + '">' +
            '<h4 class="card-title">' + nombre + '</h4> </a>' +
            '<p class="card-text">' + mensaje + '</p>' +
            '<button class="btn btn-link" type="button">Ir a la conversación<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">' +
            '<path d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z" fill="currentColor"></path>' +
            '<path d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z" fill="currentColor"></path>' +
            '</svg></button>' +
            '<button class="btn btn-link remove" type="button">Remover<i class="far fa-trash-alt"></i></button>' +
            '</div></div>');
    }
}

// Actualiza la información (al abrir) del modal que abre el botón flotante de conexiones
$('#conexiones-link').click(function () {

    // fetch para obtener el número de solicitudes pendientes //

    fetch('', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        // actualizarla cantidad de cards en el modal y rellenar cada una con los datos obtenidos

        // eliminar las cards que ya existen
        $('.pendiente').remove();

        // crear las nuevas cards
        addCardPendientes(json);
    });

    // fetch para obtener el número de solicitudes aceptadas //
    fetch('', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        // actualizarla cantidad de cards en el modal y rellenar cada una con los datos obtenidos

        // eliminar las cards que ya existen
        $('.aceptada').remove();

        // crear las nuevas cards
        addCardAceptadas(json);

    });

    // fetch para obtener el número de solicitudes rechazadas //
    fetch('', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        // actualizarla cantidad de cards en el modal y rellenar cada una con los datos obtenidos

        // eliminar las cards que ya existen
        $('.rechazada').remove();

        // crear las nuevas cards
        addCardRechazadas(json);
    });


})