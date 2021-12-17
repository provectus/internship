import './Expenses.css';
import Expense from '../../components/Expense/Expense';
import { Plus } from 'react-feather';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import expensesService from '../../services/expensesService';

function Expenses({ setExpensesRoutes }) {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchExpenses() {
    let data = await expensesService.getExpenses()
    if (loading) {
      setExpenses(data)
      setExpensesRoutes(expenses)
    }
  }

  async function deleteExpense(id) {
    let resp = await expensesService.deleteExpense(id)
    console.log(resp)
    setLoading(true)
    fetchExpenses()
  }

  useEffect(() => {
    fetchExpenses()
    return () => { setLoading(false) }
  })

  return (
    <main>
      <h1>History</h1>
      <Link to="/statistic" style={{ textDecoration: "none" }}><div className="link-button">See Expenses Analysis</div></Link>
      {!loading ? (
        <>
          <div>
            <hr align="center" width="100%" size="1" color="#31AB06" />
            <div>
              <i><Plus size={20} /></i>
              <Link to="/add-expense" style={{ textDecoration: "none" }}>
                <span>Add new expense</span>
              </Link>
            </div>
          </div>
          <ul>
            {expenses.map((expense) => (
              <Expense key={expense._id} id={expense._id} description={expense.description} amount={expense.amount} date={expense.date} onDeleteClick={() => deleteExpense(expense._id)} />
            ))}
          </ul>
        </>
      ) : (<p>Loading...</p>)}
    </main>
  );
}

export default Expenses;