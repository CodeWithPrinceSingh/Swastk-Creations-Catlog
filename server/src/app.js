import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import wishlistRoutes from "./routes/wishlistRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
const sitemapRoute = require('./routes/sitemap');


const app = express();

app.use("/", sitemapRoute);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'https://swastik-creations-catlog.vercel.app',
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dataSource: process.env.DATA_SOURCE || 'mock' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
