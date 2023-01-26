const ws = require('ws');

const wsServer = new ws.Server({ port: 3002 }, () => {
  console.log('WebSocket server is listening on port 3002...');
});
const sockets = {};

wsServer.on('connection', (socket, request) => {
  const url = request.headers.host;
  sockets[url] = socket;
  console.log('connected with URL: ' + url);

  socket.on('message', (message) => {
    const id = message.toString();
    if (sockets[id]) {
      sockets[id].send('only reply to you, dear!');
    }
  });

  socket.on('close', () => {
    delete sockets[url];
    console.log('disconnected, delete ' + url);
  })
});