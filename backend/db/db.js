// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/uber-clone", {

    });
    console.log("MongoDB Connected Successfully...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Force exit on failure
  }
};

module.exports = connectDB;
