const User = require("../models/User");

// @desc GET all Users
// @route /api/users

const getAllUser = async (req, res, next) => {
  const users = await User.find({});
  res.json({ users });
};

// @desc POST new user
// @route /api/user
const newUser = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (!userExists) {
    const user = new User({ email });
    await user.save();
    res.status(201).json(userExists);
  }
};

module.exports = { getAllUser,newUser };
