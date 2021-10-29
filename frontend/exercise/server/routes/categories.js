const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', async function(req, res) {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
