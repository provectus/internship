const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.route('/')
  .get(async (_, res) => {
    try {
      const expenses = await Expense.find({});
      return res.status(201).json(expenses);
    } catch (error) {
      return res.status(400).json({ error });
    }
  })
  .post(async ({ body }, res) => {
    try {
      const expense = await Expense.create(body);
      return res.status(200).json(expense);
    } catch (error) {
      return res.status(422).json({ ...error });
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const expense = await Expense.findOne({ _id: req.params.id });
      if (!expense) {
        return res.status(404).json({ error: 'Not Found' });
      }
      return res.status(200).json(expense);
    } catch (error) {
      return res.status(404).json({ error: 'Not Found' });
    }
  })
  .put(async (req, res) => {
    try {
      const { description, amount, date, category } = req.body;
      const expense = await Expense.findOneAndUpdate(
        { _id: req.params.id },
        {
          description,
          amount,
          date,
          category,
        },
        { returnDocument: 'after' }
      );

      if (!expense) {
        return res.status(404).json({ error: 'Not Found' });
      }

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(404).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const expense = await Expense.findOneAndDelete({ _id: req.params.id });

      if (!expense) {
        return res.status(404).json({ error: 'Not Found' });
      }

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(404).json({ error: 'Not Found' });
    }
  });

module.exports = router;
