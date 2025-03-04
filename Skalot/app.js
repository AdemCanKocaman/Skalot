const inputChat = document.getElementById('Input-Chat');
const chatContainer = document.querySelector('.Chating');
const sendIcon = document.querySelector('.bx-send');

async function fetchData() {
    const response = await fetch('data.json');
    return response.json();
}

function showTypingIndicator() {
    const typingMessage = document.createElement('div');
    typingMessage.classList.add('MessageBoxIA');
    typingMessage.textContent = 'Skalot is typing...';
    chatContainer.appendChild(typingMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingMessage;
}

function sendMessage(message, isUser = true) {
    const messageBox = document.createElement('div');
    messageBox.classList.add(isUser ? 'MessageBox' : 'MessageBoxIA');
    messageBox.textContent = message;
    chatContainer.appendChild(messageBox);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function handleMessage() {
    const message = inputChat.value.trim().toLowerCase();
    if (message) {
        sendMessage(message, true);
        inputChat.value = '';

        const typingIndicator = showTypingIndicator();

        setTimeout(async () => {
            chatContainer.removeChild(typingIndicator);
            const data = await fetchData();
            const botResponse = data[message] || "Üzgünüm, bu konuda bilgi bulamadım.";
            sendMessage(botResponse, false);
        }, 1500);
    }
}

sendIcon.addEventListener('click', handleMessage);
inputChat.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleMessage();
    }
});
