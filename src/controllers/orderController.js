const asyncHandler = require('../utils/asyncHandler.js');
const Order = require('../model/Order.js');
const Product = require('../model/Product.js');
const ApiError = require('../utils/APiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const { emitAdminAnalytics } = require('../sockets/socket');

// Helper function to calculate sales analytics
async function calculateSalesAnalytics() {

  const sales = await Order.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: '$product.category',
        totalSales: { $sum: '$quantity' },
        revenue: { $sum: { $multiply: ['$quantity', '$price'] } }
      }
    }
  ]);
  return sales;
}

// Create new order
exports.createOrder = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // Check product stock
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  // Create order
  const order = await Order.create({
    product: productId,
    quantity,
    price: product.price,
    user: req.user.id,
    status: 'pending',
  });

  // Reduce product stock
  product.stock -= quantity;
  await product.save();

  // Emit stock update
  emitStockUpdate(productId.toString(), product.stock);

  return res.status(201).json(new ApiResponse(201, order, 'Order created successfully'));
});

// Update order status (e.g., mark as completed)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('product');
  if (!order) throw new ApiError(404, 'Order not found');

  order.status = req.body.status || order.status;
  await order.save();

  // Recalculate sales and emit analytics if order completed
  if (order.status === 'completed') {
    const analytics = await calculateSalesAnalytics();
    emitAdminAnalytics(analytics);
  }

  return res.json(new ApiResponse(200, order, 'Order status updated'));
});

// Get all orders (admin or user-based filtering)
exports.getOrders = asyncHandler(async (req, res) => {
  let orders;
  if (req.user.role === 'admin') {
    orders = await Order.find().populate('product user');
  } else {
    orders = await Order.find({ user: req.user.id }).populate('product');
  }
  return res.json(new ApiResponse(200, orders));
});
