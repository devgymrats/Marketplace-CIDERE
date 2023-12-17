function cargarMensajes(selectedChat) {
 
  const chat_messages = document.getElementById("chat");

  //console.log(selectedChat);
  mensajes = selectedChat.messages;
  //console.log(mensajes);

  mensajes.forEach((mensaje) => {
    mensaje.remitente === "minera"
      ? chat_messages.appendChild(agregarIzquierda(mensaje))
      : chat_messages.appendChild(agregarDerecha(mensaje));
  });

 

  // Limpiar el mensaje almacenado en localStorage después de mostrarlo
 
}
