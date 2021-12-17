import './AddExpense.css';
import React from 'react';
import NewExpenses from '../../components/NewExpense/NewExpense';
import expensesService from '../../services/expensesService';
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();
  const defaultValues = { description: '', amount: '', date: '', category: 0 }

  async function addNewExpense({ description, amount, date, category }) {
    console.log({ amount, date: new Date(date), description, category })
    let res = await expensesService.addExpense(amount, new Date(date), description, category)
    console.log(res)
    navigate('/')
  }

  return (
    <main>
      <h1>New Expense</h1>
      <NewExpenses onSubmit={addNewExpense} defaultValues={defaultValues} />
    </main>
  );
}

export default AddExpense;