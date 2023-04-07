const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MONGODB is connected}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDatabase };
