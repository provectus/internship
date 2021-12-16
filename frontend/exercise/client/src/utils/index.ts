import {
  Category,
  Expense,
  ExpensesByDay,
  ExpensesByMonthYear,
} from '../types';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function expenseMonthYear(expense: Expense): string {
  const date = new Date(expense.date);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return month + ' ' + String(year);
}

function monthYearToDate(monthYear: string): Date {
  const [month, year] = monthYear.split(' ');
  return new Date(Number(year), monthNames.indexOf(month));
}

export const utils = {
  expensesByMonthYear(expenses: Array<Expense>): ExpensesByMonthYear {
    const _expensesByMonthYear = new Map<string, Expense[]>();
    for (const expense of expenses) {
      const monthYear = expenseMonthYear(expense);
      if (!_expensesByMonthYear.has(monthYear)) {
        _expensesByMonthYear.set(monthYear, [expense]);
      } else {
        _expensesByMonthYear.get(monthYear)?.push(expense);
      }
    }
    return _expensesByMonthYear;
  },
  expensesMonthYearRange(expensesByMonthYear: ExpensesByMonthYear): string[] {
    return Array.from(expensesByMonthYear.keys()).sort(
      (a, b) => monthYearToDate(b).getTime() - monthYearToDate(a).getTime()
    );
  },
  expensesByDay(expenses: Array<Expense>): ExpensesByDay {
    const _expensesByDay = new Map<number, Expense[]>();
    for (const expense of expenses) {
      const day = new Date(expense.date).getDate();
      if (!_expensesByDay.has(day)) {
        _expensesByDay.set(day, [expense]);
      } else {
        _expensesByDay.get(day)?.push(expense);
      }
    }
    return _expensesByDay;
  },
  sortedCategories(categories: Category[]): Category[] {
    return [...categories].sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
  },
  categoryExpenses(expenses: Expense[], category: Category): Expense[] {
    return expenses.filter((expense) => expense.category === category._id);
  },
  totalExpenses(expenses: Expense[]): number {
    return expenses.reduce((accum, expense) => accum + expense.amount, 0);
  },
  expenseCategoryTitle(expense: Expense, categories: Category[]): string {
    for (const category of categories) {
      if (expense.category === category._id) {
        return category.title;
      }
    }
    return '';
  },
};
