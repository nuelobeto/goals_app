const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  // get all users in the database
  const users = await User.find();
  res.status(200).json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  // get the required fields
  const { name, email, password } = req.body;

  // validate the fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if a user already has that email
  const existingUser = await User.findOne({
    email: new RegExp("^" + email + "$", "i"),
  });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  // if the new email is valid, encrypt the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: new RegExp("^" + email + "$", "i"),
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user.id),
  });
});

const currentUser = asyncHandler(async (req, res) => {
  const { _id, email, name } = req.user;
  res.status(200).json({
    _id,
    email,
    name,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  currentUser,
};
