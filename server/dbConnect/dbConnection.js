// server.js
const mongoose = require('mongoose');

//connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const MONGODB_URI = 'mongodb+srv://ali:ali123@atlascluster.g2vtiqo.mongodb.net/ecommerce-app-2';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectToMongoDB;
