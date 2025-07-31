const asyncHandler = require('../utils/asyncHandler.js');
const Category = require('../model/Category.js');
const ApiError = require('../utils/APiError');
const ApiResponse = require('../utils/ApiResponse');

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  return res.status(201).json(new ApiResponse(201, category, 'Category created successfully'));
});

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  return res.json(new ApiResponse(200, categories));
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) throw new ApiError(404, 'Category not found');
  return res.json(new ApiResponse(200, category, 'Category updated successfully'));
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  return res.json(new ApiResponse(200, null, 'Category deleted successfully'));
});
