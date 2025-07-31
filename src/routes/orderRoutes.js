const express = require('express');
const router = express.Router();

const {
  createOrder,
  updateOrderStatus,
  getOrders
} = require('../controllers/orderController');

const { protect, adminOnly } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and tracking
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Place a new order (authenticated users)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 60c72b2f9b1e8b0012345678
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Insufficient stock or bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get orders (admin gets all, users get own orders)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/orders/{id}/status:
 *   patch:
 *     summary: Update order status (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1e8b0012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Order not found
 */

router.use(protect);

// Place an order (any authenticated user)
router.post('/', createOrder);

// Get orders (admin: all orders, customer: own orders)
router.get('/', getOrders);

// Update order status (only admin)
router.patch('/:id/status', adminOnly, updateOrderStatus);

module.exports = router;
