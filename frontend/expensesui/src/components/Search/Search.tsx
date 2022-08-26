import './Search.css';
import findExpense from 'src/lib/api/findExpense';
import { SearchProps } from './types';
import React from 'react';
import {
    _Error
} from 'src/lib/api/types';
import { Expense } from '../Table/types';

export default function Search({ setSearchResults } : SearchProps) {
    const isError = (data: Expense | _Error): data is _Error => {
        return (data as _Error).error !== undefined;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchResults([]);
            return;
        }

        findExpense(e.target.value)
            .then((data) => setSearchResults(isError(data)? [] : [data]))    
    }

    return <input type="text" placeholder="Search by ID here" className="searchbar" onChange={handleChange}/>
}