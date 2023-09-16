// reference webpage elements
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
const sendMessage = document.getElementById('send-message');
const messages = document.getElementById('messages');
const input = document.getElementById('input');

// create an empty socket variable
let socket = null;

// add event listeners to the elements
connect.addEventListener('click', () => {
    messages.innerHTML += `<p>Opening WebSocket...</p>`;
    //   connect socket ro a new instance
    //   socket = new WebSocket("wss://ws.postman-echo.com/raw");
    socket = new WebSocket("ws://localhost:8080");

    //   add listeners to socket instance
    socket.addEventListener('open', () => {
        messages.innerHTML += `<p>CONNECTED!</p>`;
    });

    socket.addEventListener('message', async event => {
        console.log(event);
        console.log(event.data);
        const data = await event.data.text()
        console.log(data);
        messages.innerHTML += `<p>Received "${data}"</p>`;
    });

    socket.addEventListener('error', () => {
        messages.innerHTML += `<p>ERROR</p>`;
    });

    socket.addEventListener('close', () => {
        messages.innerHTML += `<p>Socket closed</p>`;
        socket = null;
    });
});

disconnect.addEventListener('click', () => {
  if (!socket) {
    messages.innerHTML += `<p>Socket not open.</p>`;
    return;
  }

  socket.close();
});

sendMessage.addEventListener('click', () => {
  if (!socket) {
    messages.innerHTML += `<p>Socket not open.</p>`;
    return;
    }
//   messages.innerHTML += `<p>Sending "WebSockets are cool!"</p>`;
socket.send(input.value);
input.value = '';
});
