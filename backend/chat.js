const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Escucha los mensajes del cliente
    socket.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido:', mensaje);
        // Reenvía el mensaje a todos los clientes conectados
        io.emit('mensaje', mensaje);
    });

    // Desconexión del usuario
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 2000;

server.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ${PORT}');
});
