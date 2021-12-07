import './Expenses.css';
import React, { useState } from 'react'
import expensesService from '../../services/expensesService'

function Expenses() {
  const [expenses, setExpenses] = useState(undefined)

  async function getExpenses() {
    let data = await expensesService.getExpenses()
    setExpenses(data)
  }

  async function deleteExpense(id) {
    let resp = await expensesService.deleteExpense(id)
    console.log(resp)
    getExpenses()
  }

  return (
    <>
      <header>
        <h1>Expense Tracker</h1>
        <p>Monitor your expenses efficiently</p>
      </header>
      <main>
        <h1>Expenses List:</h1>
        {!expenses && (<button type="button" onClick={getExpenses}>Show Expenses</button>)}
        {!!expenses && (
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id}>{expense.description} {expense.amount} {new Date(expense.date).toLocaleDateString()} {new Date(expense.date).toLocaleTimeString()} <button type="button" onClick={() => deleteExpense(expense._id)}>x</button></li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default Expenses;