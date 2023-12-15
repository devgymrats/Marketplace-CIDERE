$('.trato-cerrar').click(function(){
    // sweet alert 2 para confirmar el cierre del trato (aceptar)
    Swal.fire({
        title: '¿Estás seguro?',
        text: "El trato se cerrará y no podrás volver a abrirlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#808080', 
        confirmButtonText: 'Cerrar trato',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // sweet alert 2 para confirmar el cierre del trato (aceptar)
            Swal.fire(
                '¡Trato cerrado!',
                'El trato ha sido cerrado',
                'success'
            )
        }
    })
});

$('.trato-denegar').click(function(){
    // sweet alert 2 para confirmar el cierre del trato (aceptar)
    Swal.fire({
        title: '¿Estás seguro?',
        text: "El trato se denegará y no podrás volver a abrirlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#808080', 
        confirmButtonText: 'Denegar trato',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // sweet alert 2 para confirmar el cierre del trato (aceptar)
            Swal.fire(
                '¡Trato denegado!',
                'El trato ha sido denegado',
                'success'
            )
        }
    })
});