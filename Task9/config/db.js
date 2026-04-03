import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/uploadFile");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

export default connectDB;