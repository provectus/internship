import React, { useState } from 'react';
import type { _updated_expense } from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';

const API = "http://localhost:5000";

function UpdateExpense({fetchExpenses} : {fetchExpenses : () => void}) {
    const [updatedExpense, setUpdatedExpense] = useState<_updated_expense>({amount: 0, date: '', description:''});
    const [updatedExpenseID, setUpdatedExpenseID] = useState('');

    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();

        fetch(`${API}/expenses/${updatedExpenseID}` , {
            method : 'PUT',
            body : JSON.stringify(updatedExpense),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then((response) => {
            if(!response.ok)
                throw new Error();
            else
                return response;

        })
        .then(() => {
            fetchExpenses();
            alert("Expense updated successfully");
        })
        .catch((e) => {
            alert("ID not found");
        })
            
    };

    return (
        <div>
            <Form onSubmit = {handleSubmit} className = "input-forms">
                <Form.Label className = "form-labels">
                    Update Expense:
                </Form.Label>
                <Form.Group>
                <Form.Label>
                    ID:
                </Form.Label>
                    <Form.Control
                        type = "text"
                        value = {updatedExpenseID}
                        required
                        onChange = {e => setUpdatedExpenseID(e.target.value)}
                    />
                
                </Form.Group>

                <Form.Group>    
                <Form.Label>
                    Amount:
                </Form.Label>
                    <Form.Control
                        type = "number"
                        min = "0"
                        placeholder = "1645 (min. 0)"
                        value = {updatedExpense.amount}
                        onChange = {e => setUpdatedExpense({...updatedExpense, amount : parseInt(e.target.value)})}
                    />
                </Form.Group>

                <Form.Group>
                <Form.Label>
                    Date:
                </Form.Label>
                    <Form.Control 
                        type = "text"
                        placeholder = "2021-12-15T13:55:00.390Z (ISO8601 Format)"
                        value = {updatedExpense.date}
                        required
                        pattern = "\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z"
                        onChange = {e => setUpdatedExpense({...updatedExpense, date : e.target.value})}
                    />
                </Form.Group>

                <Form.Group>
                <Form.Label>
                    Description:
                </Form.Label>
                    <Form.Control
                        type = "text"
                        placeholder = "Magnit"
                        value = {updatedExpense.description}
                        required
                        onChange = {e => setUpdatedExpense({...updatedExpense, description : e.target.value})}
                    />
                </Form.Group>

                <Button type = "submit" value = "Update Expense" variant = "dark" className = "input-buttons">
                    Update Expense
                </Button>
            </Form>
        </div>
    );
}

export default UpdateExpense;