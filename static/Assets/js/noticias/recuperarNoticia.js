$(document).ready(function() {
    $.ajax({
        url: 'http://paredes.myddns.me:5000/noticias',
        type: 'GET',
        success: function(response){
            let noticias = response.noticias;
            let noticiasContainer = $('.noticias');

            // Función para formatear la fecha en "DD/MM/YYYY"
            function formatDate(fecha) {
                const date = new Date(fecha);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Los meses comienzan desde 0
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
    
            // Itera sobre cada noticia y crea dinámicamente la card
            noticias.forEach(function(noticia){
                let cardHtml = `
                    <div class="col-md-4 col-lg-12">
                        <div class="blog-card blog-card-blog">
                            <div class="blog-card-image"><a href="${noticia.enlace}"><img class="img" src="assets/img/noticias/${noticia.imagen}" width="180" height="270"></a>
                                <div class="ripple-cont"></div>
                            </div>
                            <div class="blog-table">
                                <h6 class="blog-category blog-text-success"><i class="far fa-newspaper"></i> Noticia</h6>
                                <h4 class="blog-card-caption"><a href="${noticia.enlace}">${noticia.titulo}</a></h4>
                                <!-- <p class="blog-card-description">${noticia.subtitulo}</p> -->
                                <div class="ftr">
                                    <div class="author">
                                        <a href="#"><span>Ir a la noticia</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                                                <path d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z" fill="currentColor"></path>
                                                <path d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="stats"><i class="far fa-calendar-alt"></i><span>${formatDate(noticia.fecha)}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    
                // Agrega la card al contenedor de noticias
                noticiasContainer.append(cardHtml);
            });
        }
    });    
});