function recuperarTexto(selectedChat) {
  //   window.onload = function () {
  //     localStorage.clear();
  //   };
  //   localStorage.clear();
  //console.log(selectedChat);

  const chat_exist = document.getElementById("chat-section");
  const chat_title = document.getElementById("chat-title");
  const chat_messages = document.getElementById("chat");

  //mensajes default al cargar la pagina
  if (selectedChat.name == "CMP" && chat_messages.innerHTML.trim() === "") {
    console.log("chat default");
    //console.log(selectedChat.messages);
    mensajes = selectedChat.messages;

    mensajes.forEach((mensaje) => {
      mensaje.remitente === "minera"
        ? chat_messages.appendChild(agregarIzquierda(mensaje))
        : chat_messages.appendChild(agregarDerecha(mensaje));
    });
    // Agregar el nuevo elemento a la lista
    // chat_messages.appendChild(agregarIzquierda());
    //  chat_messages.appendChild(agregarDerecha(proveedor));
  } else {
    console.log("No es el chat default");

    var textarea = document.getElementById("messageInput");
    var nuevo_mensaje = textarea.value;
    if (nuevo_mensaje == "") {
      return false;
    } else {
      //cargarMensajes(selectedChat);
      const newMessage = enviarMensaje(nuevo_mensaje, selectedChat);
      return newMessage;
    }
  }
}

function agregarIzquierda(contenido) {
  var nuevoMensaje = document.createElement("li");

  nuevoMensaje.className = "my-2";
  nuevoMensaje.innerHTML =
    '<div class="card border border-muted" style="width: 65%;border-top-left-radius: 20px;border-top-right-radius: 0px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">' +
    '<div class="card-body text-center p-2">' +
    '<p class="text-start card-text" style="font-size: 1rem;">' +
    contenido.contenido +
    "</p>" +
    '<h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">' +
    contenido.fecha +
    "</h6></div></div>";

  return nuevoMensaje;
}

function agregarDerecha(contenido) {
  var nuevoMensaje = document.createElement("li");

  nuevoMensaje.className = " d-flex justify-content-end my-2";
  nuevoMensaje.innerHTML =
    '<div class="card border border-muted" style="width: 65%;border-top-left-radius: 20px;border-top-right-radius: 0px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">' +
    '<div class="card-body text-center p-2">' +
    '<p class="text-start card-text" style="font-size: 1rem;">' +
    contenido.contenido +
    "</p>" +
    '<h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">' +
    contenido.fecha +
    "</h6></div></div>";

  return nuevoMensaje;
}
