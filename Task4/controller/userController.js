import User from "../models/User.js";
import Counter from "../models/Counter.js";

const formatValidationErrors = (error) => {
  return Object.values(error.errors).map((item) => item.message);
};

const formatUser = (user) => {
  return {
    id: user.userId,
    mongoId: user._id,
    name: user.name,
    email: user.email,
    age: user.age
  };
};

const createUser = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const user = await User.create({
      userId: counter.seq,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: formatUser(user)
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatValidationErrors(error)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ userId: 1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users.map((user) => formatUser(user))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const numericId = Number(req.params.id);

    if (!Number.isInteger(numericId) || numericId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id. Use a number like 1, 2, or 3."
      });
    }

    const user = await User.findOne({ userId: numericId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: formatUser(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { createUser, getUsers, getUserById };
