const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/notes_db";
// "mongodb+srv://pradhanmihir17:mihir@cluster0.cor7eni.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0";

function connectDB() {
  return mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      throw error;
    });
}

module.exports = connectDB;
