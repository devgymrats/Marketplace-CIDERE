// Función para cargar los mensajes del chat desde el backend
function loadChatMessages(chatId) {
    // Realiza una solicitud al backend (aquí asumo que el backend proporciona mensajes en formato JSON)
    fetch(`/backend/api/chat/${chatId}`)
        .then(response => response.json())
        .then(data => {
            // Procesa los mensajes y actualiza el contenido del chat
            updateChatContent(data);
        })
        .catch(error => {
            console.error('Error al cargar los mensajes del chat:', error);
        });
}

// Función para actualizar el contenido del chat con los mensajes recibidos
function updateChatContent(messages) {
    const chatContentElement = document.getElementById('chat-content');
    chatContentElement.innerHTML = ''; // Limpia el contenido existente

    const chatHistory = document.createElement('ul');
    chatHistory.classList.add('list-unstyled');

    messages.forEach(message => {
        const listItem = document.createElement('li');
        listItem.textContent = `${message.sender}: ${message.text}`;
        chatHistory.appendChild(listItem);
    });

    chatContentElement.appendChild(chatHistory);
}

// Ejemplo de cómo utilizar la función en tu código existente
document.addEventListener('DOMContentLoaded', () => {
    const chatButtons = document.querySelectorAll('.chat-box li');

    chatButtons.forEach(button => {
        button.addEventListener('click', () => {
            const chatId = button.dataset.chatId;
            loadChatMessages(chatId);
        });
    });
});
