import React, {useState} from 'react';
import type {_added_expense} from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';

const API = "http://localhost:5000";
  
function AddExpense({fetchExpenses} : {fetchExpenses : () => void}) {
    const [addedExpense, setAddedExpense] = useState<_added_expense>({amount: 0, date: '', description:'' ,category:''});

    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();

        console.log(JSON.stringify(addedExpense));

        fetch(`${API}/expenses` , {
            method : 'POST',
            body : JSON.stringify(addedExpense),
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
            alert("Expense added successfully.")
        })
        .catch((e) => {
            alert("Category not found.");
        });
    } 

    return (
        <Form onSubmit = {handleSubmit} className = "input-forms">
            <Form.Label className = "form-labels">
                Add Expense:
            </Form.Label>
            <Form.Group>
                <Form.Label>
                    Amount:
                </Form.Label>
                    <Form.Control
                        type = "number"
                        min = "0"
                        placeholder = "5225 (min. 0)"
                        value = {addedExpense.amount}
                        onChange = {e => setAddedExpense({...addedExpense, amount : parseInt(e.target.value)})}
                    />
            </Form.Group>

            <Form.Group>
            <Form.Label>
                Date:
            </Form.Label>
                <Form.Control
                    required
                    type = "text"
                    placeholder = "2021-12-15T13:55:00.390Z (ISO8601 Format)"
                    value = {addedExpense.date}
                    pattern = "\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z"
                    onChange = {e => setAddedExpense({...addedExpense, date : e.target.value})}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Description:
                </Form.Label>
                    <Form.Control
                        required
                        type = "text"
                        placeholder = "Magnit"
                        value = {addedExpense.description}
                        onChange = {e => setAddedExpense({...addedExpense, description : e.target.value})}
                    />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Category:
                </Form.Label>
                    <Form.Control
                        required
                        type = "text"
                        placeholder = "617be036888f752511901458"
                        value = {addedExpense.category}
                        onChange = {e => setAddedExpense({...addedExpense, category : e.target.value})}
                    />
            </Form.Group>
            <Button variant = "dark" type = "submit" className = "input-buttons">
                Add Expense
            </Button>
        </Form>
    )

}

export default AddExpense;
