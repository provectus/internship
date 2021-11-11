const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');


/**
* @swagger
* definitions:
*   Expense:
*     required:
*       - _id
*       - description
*       - amount
*       - date
*     properties:
*       _id:
*         type: string
*         example: 617be036888f752511901458
*       description:
*         type: string
*         example: 'Ikea'
*       amount:
*         type: number
*         example: 999999
*       date:
*         type: string
*         example: 2021-10-29T11:51:18.805Z
*       createdAt:
*         type: string
*         example: 2021-10-29T11:51:18.805Z
*       updatedAt:
*         type: string
*         example: 2021-10-29T11:51:18.805Z
*/

/**
* @swagger
* /expenses:
*   get:
*     description: Returns all expenses
*     responses:
*       200:
*         description: Returns list of expenses.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 "$ref": "#/definitions/Expense"
*   post:
*     description: Creates new expense
*     parameters:
*      - name: expense
*        in: body
*        required: true
*        schema:
*          type: object
*          properties:
*            amount:
*              type: number
*              example: 3420
*            date:
*              type: string
*              format: date-time
*            description:
*              type: string
*              example: Ikea
*            category:
*              type: string
*              example: 617be036888f752511901458
*          required:
*            - amount
*            - date
*            - description
*            - category
*     responses:
*       201:
*         description: Returns the newly created expense.
*         content:
*           "application/json":
*             "$ref": "#/definitions/Expense"
*       422:
*         description: Unprocessable Entity
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/Error'
*/

router.route('/')
  .get(async (_, res) => {
    try {
      const expenses = await Expense.find({});
      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(400).json({ error });
    }
  })
  .post(async ({ body }, res) => {
    try {
      const expense = await Expense.create(body);
      return res.status(201).json(expense);
    } catch (error) {
      return res.status(422).json({ ...error });
    }
  });

/**
* @swagger
* /expenses/{id}:
*   get:
*     description: Returns all expenses
*     parameters:
*      - name: id
*        in: path
*        required: true
*     responses:
*       200:
*         description: Returns list of expenses.
*         content:
*           application/json:
*             schema:
*               "$ref": "#/definitions/Expense"
*       404:
*         description: Not Found
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/Error'
*   put:
*     description: Updates expense
*     parameters:
*      - name: id
*        in: path
*        required: true
*      - name: expense
*        in: body
*        required: true
*        schema:
*          type: object
*          properties:
*            amount:
*              type: number
*              example: 3420
*            date:
*              type: string
*              format: date-time
*            description:
*              type: string
*              example: Ikea
*          required:
*            - amount
*            - date
*            - description
*     responses:
*       201:
*         description: Returns updated expense.
*         content:
*           "application/json":
*             "$ref": "#/definitions/Expense"
*       422:
*         description: Unprocessable Entity
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/Error'
*   delete:
*     description: Returns all expenses
*     parameters:
*      - name: id
*        in: path
*        required: true
*     responses:
*       200:
*         description: Returns deleted expense.
*         content:
*           application/json:
*             schema:
*               "$ref": "#/definitions/Expense"
*       404:
*         description: Not Found
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/Error'
*/

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
