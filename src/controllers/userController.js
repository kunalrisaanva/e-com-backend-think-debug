const asyncHandler = require('../utils/asyncHandler.js');
const User = require('../models/User');
const ApiError = require('../utils/APiError');
const ApiResponse = require('../utils/ApiResponse');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  return res.json(new ApiResponse(200, users));
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  return res.json(new ApiResponse(200, user));
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  user.role = role;
  await user.save();
  return res.json(new ApiResponse(200, user, 'Role updated successfully'));
});
