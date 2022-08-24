import './AddExpense.css';
import React from 'react';
import NewExpenses from '../../components/NewExpense/NewExpense';
import expensesService from '../../services/expensesService';
import { useNavigate } from "react-router-dom";
import { ExpenseDataInterface } from '../../types';

function AddExpense() {
  const navigate = useNavigate();
  const defaultValues = { description: '', amount: 0, date: '', category: '0' }

  async function addNewExpense(expenseData: ExpenseDataInterface) {
    console.log(expenseData)
    let res = await expensesService.addExpense(expenseData)
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