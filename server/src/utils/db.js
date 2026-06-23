import mongoose from 'mongoose';

export const connectMongo = async () => {
  if (process.env.DATA_SOURCE !== 'mongo') return console.log(process.env.DATA_SOURCE);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
