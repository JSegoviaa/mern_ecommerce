import path from 'path';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import pkg from 'cloudinary';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

//cloidinary
const cloudinary = pkg;

dotenv.config();

//Conexión a la base dedatos
connectDB();

const app = express();

if (process.env.NODE_ENV === 'desarrollo') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//Conexión a cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

//Servidor
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Servidor en modo ${process.env.NODE_ENV} en el puerto ${PORT}`.yellow.bold
  )
);
