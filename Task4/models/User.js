import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be greater than 0"]
    }
  },
  {
    timestamps: true,
    collection: "UserValidation"
  }
);

const User = mongoose.model("ValidatedUser", userSchema);

export default User;
