function enviarMensaje(contenido, selectedChat) {
  console.log("Se esta enviando", contenido);
  // vaciar contenido del input con id messageInput
    document.getElementById("messageInput").value = "";

  const newMessage = {
    remitente: "proveedor",
    contenido: contenido,
    fecha: getDate(),
  };

  const chat_messages = document.getElementById("chat");
  console.log("ACA ESTA EL ERROR");
  chat_messages.appendChild(agregarDerecha(newMessage));

  return newMessage;


}
