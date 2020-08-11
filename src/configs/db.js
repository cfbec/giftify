import mongoose from 'mongoose';

export default async (app) => {
  const MONGODB_URI = process.env.MONGODB_URI
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected.');
  } catch (error) {
    console.log(error);
  }
};