import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const userSocketMap = {}; // user_id: socket_id

const getReceiverSocketId = (user_id) => userSocketMap[user_id];

io.on('connection', (socket) => {
  console.log('WS: user connected', socket.id);
  const user_id = socket.handshake.query.user_id;

  if (user_id && user_id !== 'undefined') userSocketMap[user_id] = socket.id;

  // it will send a message to all the online users
  io.emit('GET_ONLINE_USERS', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('WS: user disconnected', socket.id);
    delete userSocketMap[user_id];
    io.emit('GET_ONLINE_USERS', Object.keys(userSocketMap));
  });
});

export {
  app,
  io,
  server,
  getReceiverSocketId
};