import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../api';
import { Category, Expense, ExpensesByMonthYear } from '../types';
import { Tabs } from './Tabs';
import { MonthPickerBar } from './MonthPickerBar';
import { utils } from '../utils';

const Page = styled.div`
  max-width: 875px;
`;

export const App = () => {
  const [expensesByMonthYear, setExpensesByMonthYear] =
    useState<ExpensesByMonthYear | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const [currentMonthYear, setCurrentMonthYear] = useState<string>('');

  const [monthYearRange, setMonthYearRange] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([api.getExpenses(), api.getCategories()]).then((results) => {
      const _expensesByMonthYear = utils.expensesByMonthYear(results[0]);
      setExpensesByMonthYear(_expensesByMonthYear);
      const _monthYearRange =
        utils.expensesMonthYearRange(_expensesByMonthYear);
      setMonthYearRange(_monthYearRange);
      setCurrentMonthYear(_monthYearRange[0]);
      setCategories(results[1]);
    });
  }, []);

  if (!expensesByMonthYear) {
    return <></>;
  }
  return (
    <Page className='m-auto h-75'>
      <MonthPickerBar
        range={monthYearRange}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setCurrentMonthYear(e.target.value)
        }
      />
      <Tabs
        expenses={expensesByMonthYear.get(currentMonthYear) as Expense[]}
        categories={categories}
        month={currentMonthYear.split(' ')[0]}
      />
    </Page>
  );
};
