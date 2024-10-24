const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      // serverSelectionTimeoutMS: 5000,
    });
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Cosmo DB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
