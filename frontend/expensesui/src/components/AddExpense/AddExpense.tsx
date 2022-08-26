import './AddExpense.css';
import { AddExpenseProps } from './types';
import React from 'react';
import { addExpense } from 'src/lib/api/addExpense';

export default function AddExpense({ openModal, closeModal, add }: AddExpenseProps) {
    if (!openModal) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newExpense = {
            description: ((e.target as HTMLFormElement)[0] as HTMLInputElement).value,
            amount: +((e.target as HTMLFormElement)[1] as HTMLInputElement).value,
            category: ((e.target as HTMLFormElement)[2] as HTMLInputElement).value,
            date: ((e.target as HTMLFormElement)[3] as HTMLInputElement).value
        }
        addExpense(newExpense).then((data) => add({ _id: data._id, ...newExpense }))
    }


    return <div className="add-expense">
        <div className="title"> Enter data </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description"/>
            <br/>
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" name="amount"/>
            <br/>
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category"/>
            <br/>
            <label htmlFor="date">Date</label>
            <input type="text" id="date" name="date" />
            <input type="submit" value="Submit" className="button submit" />
            <input type="button" value="Cancel" className="button" onClick={closeModal}/>
        </form>
    </div>
}