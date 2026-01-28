import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // exit app if DB fails
  }
};

export default connectDB;
