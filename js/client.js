const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageImp');
const messageContainer = document.querySelector(".container");
window.scrollTo(0, messageContainer.innerHeight);


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}



const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'joinedchat')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'leftchat')
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})