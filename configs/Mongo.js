const mongoose = require('mongoose');

const dbConfig = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/asodb', {
     
    });
      console.log('Connected to MongoDB');

  
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

module.exports = dbConfig;