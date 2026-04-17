import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 * Exits the process on failure so the server never boots in a broken state.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds for Atlas cold starts
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌  MongoDB runtime error:', err.message);
    });
  } catch (error) {
    console.error('❌  MongoDB connection failed:', error.message);
    console.error('👉  Check: 1) MONGO_URI in .env  2) Atlas IP whitelist (add 0.0.0.0/0 for dev)  3) Network/VPN');
    process.exit(1);
  }
};

export default connectDB;
