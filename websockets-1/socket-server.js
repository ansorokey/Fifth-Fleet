const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', webSocket => {
  console.log('client connecting...');

  let interval = null;
//   setInterval(() => webSocket.send('Hello?'), 1000);

  webSocket.on('message', message => {
    console.log('received: %s', message);
    webSocket.send(message);
  });

  webSocket.on('close', () => {
    console.log('Connection closed.');
    // clearInterval(interval)
  });
});
