import user from "../model/user.js";

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.json({
        message: "Name and Email are required"
      });
    }

    const newUser = new user({
      name,
      email
    });

    await newUser.save();

    res.json({
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    res.json({
      message: "Server Error",
      error: error.message
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await user.find();

    res.json({
      message: "All users fetched successfully",
      data: users
    });
  } catch (error) {
    res.json({
      message: "Server Error",
      error: error.message
    });
  }
};


export { createUser, getUsers };