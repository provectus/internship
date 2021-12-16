import { Button, Row, Stack } from 'react-bootstrap';
import { Expense } from '../../types';

interface Props {
  day: number;
  month: string;
  expenses: Array<Expense>;
}

export const DayExpenses = (props: Props) => {
  const dayExpenses = props.expenses.map((expense) => {
    return (
      <Row key={expense._id}>
        <li>
          {expense.amount.toLocaleString()} - {expense.description}
          <span className='float-end'>
            <Button variant='outline-primary' className='me-2'>
              <i className='bi bi-pencil-square'></i>
            </Button>
            <Button variant='outline-danger'>
              <i className='bi bi-trash'></i>
            </Button>
          </span>
        </li>
      </Row>
    );
  });
  return (
    <>
      <h5>
        {props.month} {props.day}
      </h5>
      <ul>
        <Stack gap={2}>{dayExpenses}</Stack>
      </ul>
      <hr />
    </>
  );
};
