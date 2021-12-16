export type Expense = {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  title: string;
};

export type ExpensesByMonthYear = Map<string, Expense[]>;

export type ExpensesByDay = Map<number, Expense[]>;
