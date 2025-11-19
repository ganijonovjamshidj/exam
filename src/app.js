import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import borrowRoutes from './routes/borrowRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/borrows', borrowRoutes);
app.use('/api/users', userRoutes);

// Error handler (har doim oxirida)
app.use(errorHandler);

export default app;
