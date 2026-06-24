import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

import { connectMongo } from './utils/db.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`🌸 Bride Store API running on http://localhost:${PORT}`);
    console.log(`   Data source: ${process.env.DATA_SOURCE || 'mock'}`);
    console.log(`   Admin login: admin@bridestore.com / Admin@123`);
  });
};

start();
