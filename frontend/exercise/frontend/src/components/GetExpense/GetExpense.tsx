import React, { useState } from 'react';
import type { _expense } from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../../style.css';

const API = "http://localhost:5000";

function GetExpense() {

    const [expenseID, setExpenseID] = useState('');
    const [expense, setExpense] = useState<_expense>({_id : '', description : '', amount: 0, category: '', date: '', createdAt: '', updatedAt: ''});
    const [showTable, setShowTable] = useState(true);

    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        
        fetch(`${API}/expenses/${expenseID}`)
            .then((res) => { 
                if (!res.ok) 
                    throw new Error(); 
                else 
                    return res;
            })
            .then((res) => res.json())
            .then((data) => {
                setExpense(data)
                setShowTable(false)
                alert("Success");
            })
            .catch((e) => {
                alert("ID not found");
            });
    };

    return(
        <div>
            <Form onSubmit={handleSubmit} className = "input-forms">
                <Form.Label className = "form-labels">
                    Get Expense:
                </Form.Label>
                <Form.Group>
                <Form.Label>
                    ID:
                </Form.Label>
                    <Form.Control 
                        required
                        type = "text"
                        value = {expenseID}
                        onChange = {e => setExpenseID(e.target.value)}
                    />
                </Form.Group>

                <Button type = 'submit' variant = "dark" className = "input-buttons">
                    Get Expense
                </Button>
                <Form.Group>
                    <Table hidden = {showTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Created at</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{expense._id}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>{expense.createdAt}</td>
                                <td>{expense.updatedAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
        </div>
    );
}

export default GetExpense;