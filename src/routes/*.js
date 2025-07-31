/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', getCategories);
