import React, {useState, useEffect} from 'react';
import AddExpense from './components/AddExpense/AddExpense';
import CategoriesTable from './components/CategoriesTable/CategoriesTable';
import ExpensesTable from './components/ExpensesTable/ExpensesTable';
import GetExpense from './components/GetExpense/GetExpense';
import DeleteExpense from './components/DeleteExpense/DeleteExpense';
import UpdateExpense from './components/UpdateExpense/UpdateExpense';
import Charts from './components/Charts/Charts';
import './App.css';

const API = "http://localhost:5000";

export type _category = {
  _id: string,
  title: string
}

export type _expense = {
  _id: string,
  description: string,
  amount: number,
  category: string,
  date: string,
  createdAt: string,
  updatedAt: string
}

export type _added_expense = {
  amount: number,
  date: string,
  description: string,
  category: string
}

export type _updated_expense = {
  amount: number,
  date: string,
  description: string
}

function App(){

  const [categories, setCategories] = useState<_category[]>([]);
  const [expenses, setExpenses] = useState<_expense[]>([]);
  const [deletedExpenseID, setDeletedExpenseID] = useState('');

  const fetchCategories = () => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data)); 
  };

  const fetchExpenses = () => {
    fetch(`${API}/expenses`)
      .then((res) => res.json())
      .then((data) => setExpenses(data)); 
  };

  const deleteExpense = () => {
    const index = expenses.findIndex(x => x._id === `${deletedExpenseID}`);
    setExpenses(old => [...old.slice(0, index), ...old.slice(index + 1)])
  };

  useEffect(() => {
    fetchCategories();
  }, [setCategories]);

  useEffect(() => {
    fetchExpenses();
  } ,[setExpenses]);

  return(
    <div>
      <div className = "wrapper">
        <AddExpense fetchExpenses = {() => fetchExpenses()}/>
        <UpdateExpense fetchExpenses = {() => fetchExpenses()}/>
        <GetExpense />
        <DeleteExpense deletedExpenseID = {deletedExpenseID} setDeletedExpenseID = {(x : string) => setDeletedExpenseID(x)} deleteExpense = {() => deleteExpense()}/>
      </div>
      <CategoriesTable categories = {categories}/>
      <ExpensesTable expenses = {expenses} />
      <Charts expenses = {expenses} categories = {categories}/>
    </div>
  );
}

export default App;
