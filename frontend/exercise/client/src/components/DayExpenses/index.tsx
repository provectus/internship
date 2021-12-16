import { Button, Row, Stack } from 'react-bootstrap';
import { Category, Expense } from '../../types';
import { utils } from '../../utils';

interface Props {
  day: number;
  month: string;
  expenses: Array<Expense>;
  categories: Array<Category>;
  onEditExpense: any;
  onDeleteExpense: any;
}

export const DayExpenses = (props: Props) => {
  const dayExpenses = props.expenses.map((expense) => {
    const handleEdit = () => {
      props.onEditExpense(
        expense,
        utils.expenseCategoryTitle(expense, props.categories)
      );
    };

    const handleDelete = () => {
      props.onDeleteExpense(expense);
    };

    return (
      <Row key={expense._id}>
        <li>
          {expense.amount.toLocaleString()} - {expense.description}
          <span className='float-end'>
            <Button
              variant='outline-primary'
              className='me-2'
              onClick={handleEdit}
            >
              <i className='bi bi-pencil-square'></i>
            </Button>
            <Button variant='outline-danger' onClick={handleDelete}>
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
