import type {_expense} from '../../App'
import Table from 'react-bootstrap/Table'
import {useState, useMemo} from 'react';
import { Pagination } from 'react-bootstrap';
import '../../style.css';

const pageSize = 15;

function ExpensesTable({expenses} : {expenses : _expense[]}) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(expenses.length/pageSize);

    const currentTableData = useMemo(() => {
            const firstPageIndex = (currentPage - 1) * pageSize;
            const lastPageIndex = firstPageIndex + pageSize;
            return expenses.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, expenses]);

    return(
    <div>
        <div className = "tables">
            <div className = "table-labels">Expenses</div>
            <Table striped bordered hover variant = "dark" className = "expenses-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
                </thead>
                <tbody>
                    {
                        currentTableData.map((expense) => (
                        <tr key = {expense._id}>
                            <td>{expense._id}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>{expense.createdAt}</td>
                            <td>{expense.updatedAt}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
        <Pagination>
            <Pagination.First onClick = {() => setCurrentPage(1)}/>
            <Pagination.Prev onClick = {() => setCurrentPage(Math.max(1, currentPage-1))}/>
            
            <Pagination.Item>{currentPage}</Pagination.Item>

            <Pagination.Next onClick = {() => setCurrentPage(Math.min(pageCount, currentPage+1))}/>
            <Pagination.Last onClick = {() => setCurrentPage(pageCount)}/>
        </Pagination>
    </div>
);
}

export default ExpensesTable;
