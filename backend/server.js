import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import conversationsRoutes from './routes/conversations.routes.js';
import { connectToDB } from './db/connect.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// To paarse the JSON data with request payload
app.use(express.json());
app.use(cookieParser());

//root route
app.get('/', (req, res) => {
  res.send('Server was and now up and running');
})

app.use('/api/auth/', authRoutes);
app.use('/api/messages/', messagesRoutes);
app.use('/api/conversations/', conversationsRoutes);


app.listen(PORT, () => {
  connectToDB();
  console.log('Server is running at port: ', PORT)
});