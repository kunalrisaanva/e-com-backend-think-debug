const asyncHandler = require('../middlewares/asyncHandler');
const Coupon = require('../models/Coupon');
const ApiError = require('../utils/APiError');
const ApiResponse = require('../utils/ApiResponse');

exports.createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  return res.status(201).json(new ApiResponse(201, coupon, 'Coupon created successfully'));
});

exports.getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  return res.json(new ApiResponse(200, coupons));
});

exports.validateCoupon = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const coupon = await Coupon.findOne({ code });
  if (!coupon) throw new ApiError(404, 'Invalid coupon code');
  if (coupon.expiresAt < new Date()) throw new ApiError(400, 'Coupon expired');
  return res.json(new ApiResponse(200, { discount: coupon.discount }, 'Coupon valid'));
});
