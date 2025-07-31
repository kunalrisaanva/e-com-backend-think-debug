const asyncHandler = require('../utils/asyncHandler.js');
const Product = require('../model/Product.js');
const ApiError = require('../utils/APiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const { emitStockUpdate } = require('../sockets/socket');

// Create a product
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  return res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
});

// Get all products with category details via $lookup
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'categories',           
        foreignField: '_id',
        localField: 'category',       
        as: 'categoryDetails'         
      }
    },
    {
      $unwind: '$categoryDetails'     // convert categoryDetails array to object
    }
  ]);
  return res.json(new ApiResponse(200, products, 'Products fetched with category details'));
});

// Update product details
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) throw new ApiError(404, 'Product not found');

  // If stock updated, emit stock update event
  if (req.body.stock !== undefined) {
    emitStockUpdate(product._id.toString(), product.stock);
  }

  return res.json(new ApiResponse(200, product, 'Product updated successfully'));
});

// Delete product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  return res.json(new ApiResponse(200, null, 'Product deleted successfully'));
});
