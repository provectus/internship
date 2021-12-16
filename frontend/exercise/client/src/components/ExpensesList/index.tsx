import { Accordion } from 'react-bootstrap';
import { Category, Expense } from '../../types';
import { utils } from '../../utils';
import { DayExpensesList } from '../DayExpensesList';
import { ExpenseCategoryAccordionItem } from '../ExpenseCategoryAccordionItem';

interface Props {
  expenses: Array<Expense>;
  categories: Array<Category>;
  month: string;
}

export const ExpensesList = (props: Props) => {
  const sortedCategories = utils.sortedCategories(props.categories);

  const expensesList = sortedCategories.map((category) => {
    const categoryExpenses = utils.categoryExpenses(props.expenses, category);

    return (
      <ExpenseCategoryAccordionItem
        key={category._id}
        expenseCategory={category}
      >
        <h5>
          Total Amount:{' '}
          <span className='text-success'>
            {utils.totalExpenses(categoryExpenses).toLocaleString()}
          </span>
        </h5>
        <hr />
        <DayExpensesList
          expensesByDay={utils.expensesByDay(categoryExpenses)}
          month={props.month}
        ></DayExpensesList>
      </ExpenseCategoryAccordionItem>
    );
  });
  return <Accordion>{expensesList}</Accordion>;
};
