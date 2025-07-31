const express = require('express');
const router = express.Router();

const { getUsers, getProfile, updateUserRole } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profiles
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/users/{id}/role:
 *   patch:
 *     summary: Update user role (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to update role for
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8b0012345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 *       404:
 *         description: User not found
 */

router.use(protect);

router.get('/', authorize('admin'), getUsers);
router.get('/profile', getProfile);
router.patch('/:id/role', authorize('admin'), updateUserRole);

module.exports = router;
