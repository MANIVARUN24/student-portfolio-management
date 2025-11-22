const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/studentPortfolioDB");
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
