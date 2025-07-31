const asyncHandler = require('../utils/asyncHandler.js');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
// const ApiError = require('../utils/ApiError');
const ApiError = require("../utils/APiError.js")
const ApiResponse = require('../utils/ApiResponse');

const JWT_SECRET = process.env.JWT_SECRET 

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'Email already exists');

  const user = await User.create({ username, email, password, role });
  const token = generateToken(user);
  return res.status(201).json(new ApiResponse(201, { user, token }, 'User registered successfully'));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const token = generateToken(user);
  return res.json(new ApiResponse(200, { user, token }, 'Login successful'));
});
