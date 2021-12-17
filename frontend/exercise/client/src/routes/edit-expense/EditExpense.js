import './EditExpense.css';
import React from 'react';
import NewExpenses from '../../components/NewExpense/NewExpense';
import expensesService from '../../services/expensesService';
import { useNavigate } from "react-router-dom";

function EditExpense({ target }) {
  const navigate = useNavigate();
  let targetTime = new Date(target.date)
  targetTime.setMilliseconds(0)
  const tzOffset = new Date().getTimezoneOffset() * 60000
  const localISOTime = new Date(targetTime - tzOffset).toISOString().slice(0, -1)
  const defaultValues = { description: target.description, amount: target.amount, date: localISOTime, category: target.category }

  async function updateExpense({ description, amount, date, category }) {
    console.log({ amount, date: new Date(date), description, category })
    let res = await expensesService.updateExpense(target._id, amount, new Date(date), description, category)
    console.log(res)
    navigate('/')
  }

  console.log(new Date(target.date).toISOString().slice(0, -1))

  return (
    <main>
      <h1>Edit Expense</h1>
      <NewExpenses onSubmit={updateExpense} defaultValues={defaultValues} />
    </main>
  );
}

export default EditExpense;