import React from 'react';
import { Expense, Category } from './Table/types';
import Table from './Table/Table';
import getExpenses from 'src/lib/api/getExpenses';
import getCategories from 'src/lib/api/getCategories';
import { mapCategoryIdTitle } from './utils';
import AddExpense from 'src/components/AddExpense/AddExpense';
import Search from './Search/Search';
import './App.css';

export default function App() {
    const [expenses, setExpenses] = React.useState<Expense[] | null>(null);
    const [categories, setCategories] = React.useState<Category[] | null>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [searchResults, setSearchResults] = React.useState<Expense[]>([]);

    React.useEffect(() => {  
        const getData = async () => {
            const respExpenses = await getExpenses();
            const respCategories = await getCategories();
            setExpenses(mapCategoryIdTitle(respExpenses, respCategories));
            setCategories(respCategories);
        }
       
        getData();
    }, []);
    
    const updateExpense = (index: number, expense: Expense) =>
        setExpenses((prev) => prev ? [
            ...prev.slice(0, index),
            expense,
            ...prev.slice(index + 1, prev.length)
        ] : []);

    const deleteExpense = (index: number) =>
        setExpenses((prev) => prev ? [
                ...prev.slice(0, index),
                ...prev.slice(index + 1, prev.length)
            ] : [])
    

    const addExpense = (expense: Expense) => 
        setExpenses((prev) => prev && categories ? mapCategoryIdTitle([
            expense,
            ...prev
        ], categories): [])
       
    return <div>
        <div className="toolbar">
            <Search setSearchResults={(expenses) => setSearchResults(expenses)}/>
            <input type="button" value="Add expense" onClick={() => setOpenModal(true)} className="add-expenses"/>
            <AddExpense openModal={openModal} closeModal={() => setOpenModal(false)} add={addExpense}/>
        </div>
        {!!expenses && <Table data={searchResults.length !== 0? searchResults : expenses} updateData={updateExpense} deleteData={deleteExpense} />}
    </div>;
};
