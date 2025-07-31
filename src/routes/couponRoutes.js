const express = require('express');
const router = express.Router();

const {
  createCoupon,
  getCoupons,
  validateCoupon,
} = require('../controllers/couponController');

const { protect, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management and validation
 */

/**
 * @swagger
 * /api/v1/coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: List of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: SAVE20
 *                       discount:
 *                         type: number
 *                         example: 20
 */

/**
 * @swagger
 * /api/v1/coupons/{code}/validate:
 *   get:
 *     summary: Validate a coupon by code
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Coupon code to validate
 *     responses:
 *       200:
 *         description: Coupon is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: SAVE20
 *                     discount:
 *                       type: number
 *                       example: 20
 *       404:
 *         description: Coupon not found or invalid
 */

/**
 * @swagger
 * /api/v1/coupons:
 *   post:
 *     summary: Create a new coupon (admin only)
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE20
 *               discount:
 *                 type: number
 *                 example: 20
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Coupon created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: SAVE20
 *                     discount:
 *                       type: number
 *                       example: 20
 *       401:
 *         description: Unauthorized
 */

// Public routes
router.get('/', getCoupons);
router.get('/:code/validate', validateCoupon);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', createCoupon);

module.exports = router;
