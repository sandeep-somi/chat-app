import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { connectToDB } from './db/connect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// To paarse the JSON data with request payload
app.use(express.json());

//root route
// app.get('/', (req, res) => {
//   res.send('Server was and now up and running');
// })

app.use('/api/auth/', authRoutes);


app.listen(PORT, () => {
  connectToDB();
  console.log('Server is running at port: ', PORT)
});