import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  try {
    if (process.env.DATABASE_URL) {
      const connection = await mongoose.connect(process.env.DATABASE_URL);
      
      return connection;
    }
    throw new Error('DATABASE_URL not defined');
  } catch (error) {
    throw new Error(error);
  }
};

export default mongoConnect;