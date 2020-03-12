'use strict';
var express = require("express");
var router = express.Router();

var category = require('../controllers/categoryController');


router.route('/categories')
/**
 * @swagger
 * /categories:
 *   get:
 *     description: Lists all categories
 *     tags:
 *      - Category
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content: 
 *           application/json: 
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Category'
 */
	.get(category.list_all_categories)
  /**
 * @swagger
 *
 * /categories:
 *   post:
 *     description: Creates a category
 *     tags:
 *      - Category
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: Category object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewCategory'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Category'
 *       400:
 *         description: Error with parameters passed
 *       500:
 *         description: Server error or error validating database constraints.  Please see the response message for more information.
 */
    .post(category.create_category);

router.route('/category/:categoryId')
/**
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     description: Find a category, type and sub type by its ID
 *     tags:
 *      - Category
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        schema: 
 *          properties:
 *            categoryId:
 *              type: integer
 *        required: true
 *        description: Numeric identifier of the category
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         schema:
 *           items:
 *             $ref: '#/definitions/Category'
 *       400:
 *         description: Error with parameters passed
 *       404:
 *         description: Category not found
 */
	.get(category.get_category)
/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     description: Delete a category
 *     tags:
 *      - Category
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        schema: 
 *          properties:
 *            categoryId:
 *              type: integer
 *        required: true
 *        description: Numeric identifier of the category
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       400:
 *         description: Error with parameters passed
 *       404:
 *         description: Category not found
 */
	.delete(category.delete_category);
	
module.exports = router;