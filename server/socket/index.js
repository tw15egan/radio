import io from 'socket.io';

export default (server) => {
  const socketServer = io(server);

  socketServer.on('connection', (socket) => {
    console.log('connected');
    socket.emit('news', { hello: 'world' });
  });
};
