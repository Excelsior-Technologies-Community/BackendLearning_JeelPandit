import User from "../model/User.js";


// ===============================
// Add User
// ===============================
export const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new User({
      name,
      email
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding user",
      error: error.message
    });
  }
};


// ===============================
// Get Users with Pagination + Search + Filter
// ===============================
export const getUsers = async (req, res) => {
  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const email = req.query.email || "";

    // skip formula
    const skip = (page - 1) * limit;

    // filter object
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    // total count
    const totalUsers = await User.countDocuments(filter);

    // paginated users
    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers: totalUsers,
      users: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};
