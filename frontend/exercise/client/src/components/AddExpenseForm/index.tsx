import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../api';
import { Category } from '../../types';
import { utils } from '../../utils';

interface Props {
  categories: Category[];
  onSubmit: any;
}

export const AddExpenseForm = (props: Props) => {
  const sortedCategories = utils.sortedCategories(props.categories);

  const [categoryId, setCategoryId] = useState(sortedCategories[0]._id);

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const [description, setDescription] = useState('');

  const [amount, setAmount] = useState<number>(1);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setValidated(true);

    await api.postExpense(
      {
        date: new Date(date).toISOString(),
        description: description,
        amount: amount,
      },
      categoryId
    );
    await props.onSubmit();
  };

  const categoryOptions = sortedCategories.map((category) => {
    return (
      <option key={category._id} value={category._id}>
        {category.title}
      </option>
    );
  });

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Select
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categoryOptions}
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
