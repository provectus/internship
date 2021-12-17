import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';

const API = "http://localhost:5000";

function GetExpense({deletedExpenseID, setDeletedExpenseID, deleteExpense} : {deletedExpenseID : string, setDeletedExpenseID : (x :string) => void, deleteExpense : () => void}) {

    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        
        fetch(`${API}/expenses/${deletedExpenseID}`, {
            method : 'DELETE'
        })
        .then((response) => {
            if (!response.ok) 
                throw new Error(); 
            else 
                return response;
        })
        .then(() => {
            deleteExpense();
            alert("Success");
        })
        .catch((e) => {
            alert("ID not found");
        })
    };

    return(
        <div>
            <Form onSubmit={handleSubmit} className = "input-forms">
                <Form.Label className = "form-labels">
                    Delete Expense:
                </Form.Label>
                <Form.Group>
                <Form.Label>
                    ID:
                </Form.Label>
                    <Form.Control 
                        required
                        type = "text"
                        value = {deletedExpenseID}
                        onChange = {e => setDeletedExpenseID(e.target.value)}
                    />
                </Form.Group>
                <Button type = 'submit' variant = "dark" className = "input-buttons">
                    Delete Expense
                </Button>
            </Form>
        </div>
    );
}

export default GetExpense;