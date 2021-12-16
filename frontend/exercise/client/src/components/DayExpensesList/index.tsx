import { ExpensesByDay } from '../../types';
import { DayExpenses } from '../DayExpenses';

interface Props {
  expensesByDay: ExpensesByDay;
  month: string;
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
      ></DayExpenses>
    );
  });

  return <>{dayExpensesList}</>;
};
