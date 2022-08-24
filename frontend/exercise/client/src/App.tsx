import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Expenses from "./routes/expenses/Expenses";
import Statistic from './routes/statistics/Statistic';
import AddExpense from './routes/add-expense/AddExpense';
import EditExpense from './routes/edit-expense/EditExpense';
import expensesService from './services/expensesService';
import { ExpenseInterface } from './types';

function App() {
  const [expenses, setExpenses] = useState<ExpenseInterface[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchExpenses() {
      let data = await expensesService.getExpenses()
      if (loading) setExpenses(data)
    }
    fetchExpenses()
    return () => { setLoading(false) }
  })

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Expenses setExpensesRoutes={setExpenses} />} />
        <Route path="/expenses" element={<Expenses setExpensesRoutes={setExpenses} />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/add-expense" element={<AddExpense />} />
        {expenses.map((expense) => (
          <Route path={`/edit-expense/${expense._id}`} element={<EditExpense target={expense} />} key={expense._id} />
        ))}
      </Routes>
    </Router>
  );
}

export default App
