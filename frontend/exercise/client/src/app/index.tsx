import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../api';
import { Category, Expense, ExpensesByMonthYear } from '../types';
import { Tabs } from './Tabs';
import { MonthPickerBar } from './MonthPickerBar';
import { utils } from '../utils';
import { PageModal } from './PageModal';

const Page = styled.div`
  max-width: 875px;
`;

export const App = () => {
  const [expensesByMonthYear, setExpensesByMonthYear] =
    useState<ExpensesByMonthYear | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const [currentMonthYear, setCurrentMonthYear] = useState<string>('');

  const [monthYearRange, setMonthYearRange] = useState<string[]>([]);

  const fetchData = () => {
    Promise.all([api.getExpenses(), api.getCategories()]).then((results) => {
      const _expensesByMonthYear = utils.expensesByMonthYear(results[0]);
      setExpensesByMonthYear(_expensesByMonthYear);
      const _monthYearRange =
        utils.expensesMonthYearRange(_expensesByMonthYear);
      setCurrentMonthYear(_monthYearRange[0]);
      setMonthYearRange(_monthYearRange);
      setCategories(results[1]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [modalState, setModalState] = useState('hidden');

  const [modalType, setModalType] = useState<string | null>(null);

  const [modalExpense, setModalExpense] = useState<Expense | null>(null);

  const [modalExpenseCategoryTitle, setModalExpenseCategoryTitle] = useState<
    string | null
  >(null);

  const handleAddExpense = () => {
    setModalType('add-expense');
    setModalState('show');
  };

  const handleEditExpense = (expense: Expense, categoryTitle: string) => {
    setModalExpense(expense);
    setModalExpenseCategoryTitle(categoryTitle);
    setModalType('edit-expense');
    setModalState('show');
  };

  const handleDeleteExpense = (expense: Expense) => {
    setModalExpense(expense);
    setModalType('delete-expense');
    setModalState('show');
  };

  if (!expensesByMonthYear) {
    return <></>;
  }
  return (
    <Page className='m-auto h-75'>
      <MonthPickerBar
        range={monthYearRange}
        currentMonthYear={currentMonthYear}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setCurrentMonthYear(e.target.value)
        }
      />
      <Tabs
        expenses={expensesByMonthYear.get(currentMonthYear) || []}
        categories={categories}
        month={currentMonthYear.split(' ')[0]}
        onAddExpense={handleAddExpense}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />
      <PageModal
        show={modalState === 'hidden' ? false : true}
        type={modalType}
        expense={modalExpense}
        expenseCategoryTitle={modalExpenseCategoryTitle}
        categories={categories}
        onHide={() => setModalState('hidden')}
        onSubmit={async () => {
          await fetchData();
          setModalState('hidden');
        }}
        onDelete={async () => {
          await fetchData();
          setModalState('hidden');
        }}
      />
    </Page>
  );
};
