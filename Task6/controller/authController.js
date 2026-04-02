import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const formatUsersWithSimpleIds = (users) =>
  users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    email: user.email,
  }));

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: 1 });
    const formattedUsers = formatUsersWithSimpleIds(users);
    
    res.json({
      success: true,
      count: formattedUsers.length,
      users: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET SINGLE USER
export const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    
    const users = await User.find().select("-password").sort({ createdAt: 1 });
    const formattedUsers = formatUsersWithSimpleIds(users);
    const user = formattedUsers.find((item) => item.id === userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }
    
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    res.json({ success: true, message: "Registration successful" });
    
  } catch (error) {
    res.json({ success: false, message: "Registration failed" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ success: false, message: "Wrong password" });
    }
    
    const users = await User.find().select("_id").sort({ createdAt: 1 });
    const simpleId = users.findIndex(
      (item) => item._id.toString() === user._id.toString()
    ) + 1;
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: simpleId,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    res.json({ success: false, message: "Login failed" });
  }
};
