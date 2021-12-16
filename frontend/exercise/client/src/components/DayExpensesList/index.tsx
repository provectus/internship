import { Category, ExpensesByDay } from '../../types';
import { DayExpenses } from '../DayExpenses';

interface Props {
  expensesByDay: ExpensesByDay;
  categories: Array<Category>;
  month: string;
  onEditExpense: any;
  onDeleteExpense: any;
}

export const DayExpensesList = (props: Props) => {
  const expensesByDaySorted = Array.from(props.expensesByDay.entries()).sort(
    (a, b) => b[0] - a[0]
  );
  const dayExpensesList = expensesByDaySorted.map(([day, expenses]) => {
    return (
      <DayExpenses
        key={day}
        day={day}
        expenses={expenses}
        month={props.month}
        categories={props.categories}
        onEditExpense={props.onEditExpense}
        onDeleteExpense={props.onDeleteExpense}
      ></DayExpenses>
    );
  });

  return <>{dayExpensesList}</>;
};
