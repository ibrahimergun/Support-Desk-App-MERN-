const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');

//you can use try-catch blok or asyncHandler
//And you can see this two examples in this form.

//validition with async handler
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //Find if user already exits

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(422);
    throw new Error('Could not create user, email is already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // Create User
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.email),
    });
  } else {
    res.status(500);
    throw new error('Creating user failed, please try again');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await User.findOne({ email: email });

  if (!loginUser) {
    res.status(422);
    throw new Error('Could not find the user, you must firsty Signup.');
  }

  const checkResult = await bcrypt.compare(password, loginUser.password);

  if (!checkResult) {
    res.status(500);
    throw new Error('Signing in failed, invalid credentials. (P)');
  }
  res.status(200).json({
    email: loginUser.email,
    username: loginUser.name,
    token: generateToken(loginUser._id, loginUser.email),
  });
});

// Get current user
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

const generateToken = (id, email) => {
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_KEY,
    { expiresIn: '1d' },
  );
};

module.exports = { registerUser, loginUser, getMe };
