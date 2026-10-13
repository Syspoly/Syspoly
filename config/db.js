const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/syspoly_db';
    
    // Attempt standard connection with 2.5s timeout
    const options = {
      serverSelectionTimeoutMS: 2500
    };

    await mongoose.connect(mongoUri, options);
    console.log(`[MongoDB Connected] Host: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB Warning] Standard MongoDB connection failed (${err.message}). Initializing MongoMemoryServer fallback...`);
    try {
      mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      await mongoose.connect(fallbackUri);
      console.log(`[MongoDB Connected] In-Memory Fallback DB active at: ${fallbackUri}`);
    } catch (fallbackErr) {
      console.error(`[MongoDB Error] Failed to start MongoMemoryServer fallback:`, fallbackErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
