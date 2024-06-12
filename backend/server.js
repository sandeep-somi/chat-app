import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


//root route
app.get('/', (req, res) => {
  res.send('Server was and now up and running');
})

app.use('/api/auth/', authRoutes);


app.listen(PORT, () => console.log('Server is running at port: ', PORT));