import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import { connectToDB } from './db/connect.js';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import messagesRoutes from './routes/messages.routes.js';

import { server, app } from './socket/socket.js';

const __dirname = path.resolve()

dotenv.config();

const PORT = process.env.PORT || 8000;

// To paarse the JSON data with request payload
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/messages/', messagesRoutes);
app.use('/api/users/', usersRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
  connectToDB();
  console.log('Server is running at port: ', PORT)
});