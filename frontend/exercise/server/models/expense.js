const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Author' }
  },
  { timestamps: true },
)

module.exports = mongoose.model('Expense', expenseSchema)
