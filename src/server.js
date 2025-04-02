import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import passport from './config/passport.js';  
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import productRoutes from './routes/productRoutes.js';  
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

config(); 

const app = express();

app.use(cors());  
app.use(express.json());  
app.use(passport.initialize()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectar a MongoDB:', err));

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);  
app.use('/api/cart', cartRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});