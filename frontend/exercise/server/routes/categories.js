const express = require('express');
const router = express.Router();
const Category = require('../models/category');

/**
* @swagger
* definitions:
*   Category:
*     required:
*       - _id
*       - title
*     properties:
*       _id:
*         type: string
*         example: 617be036888f752511901458
*       title:
*         type: string
*         example: 'Shopping'
*/

/**
* @swagger
* /categories:
*   get:
*     description: Returns all expense categories available to users
*     responses:
*       200:
*         description: Returns list of categories.
*         content:
*           "application/json":
*             schema:
*               "type": "array"
*               "items":
*                 "$ref": "#/definitions/Category"
*/
router.get('/', async function(req, res) {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
