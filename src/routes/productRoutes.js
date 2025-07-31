const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products with category info (public)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products with categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "60c72b2f9b1e8b0012345678"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update product details (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8b0012345678"
 *     requestBody:
 *       description: Fields for the product to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Laptop"
 *               price:
 *                 type: number
 *                 example: 1099.99
 *               stock:
 *                 type: integer
 *                 example: 40
 *               category:
 *                 type: string
 *                 example: "60c72b2f9b1e8b0012345678"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8b0012345678"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */

router.get('/', getProducts);

router.use(protect);
router.use(adminOnly);

router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
