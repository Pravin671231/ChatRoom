const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log(`Database connected host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Database connect failed ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
