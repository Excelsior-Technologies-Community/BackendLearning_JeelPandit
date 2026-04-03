import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/errorHandle");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};

export default connectDB;