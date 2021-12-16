import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../api';
import { Expense } from '../../types';

interface Props {
  expenseCategoryTitle: string;
  expense: Expense;
  onSubmit: any;
}

export const EditExpenseForm = (props: Props) => {
  const [date, setDate] = useState(
    new Date(props.expense.date).toISOString().substring(0, 10)
  );

  const [description, setDescription] = useState<string>(
    props.expense.description
  );

  const [amount, setAmount] = useState<number>(props.expense.amount);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setValidated(true);

    await api.putExpense(props.expense._id, {
      date: date,
      description: description,
      amount: amount,
    });
    await props.onSubmit();
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Select disabled required defaultValue='0'>
          <option value='0'>{props.expenseCategoryTitle}</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-3' controlId='date'>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type='date'
          required
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='amount'>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type='number'
          required
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount || ''}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};
