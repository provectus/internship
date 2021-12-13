import { Category, Expense } from "../components/types";

export const expensesBySelectedMonth = (
  expenses: Expense[],
  monthNum: number
) => {
  return expenses.filter((expense) => {
    return new Date(expense.date).getMonth() === monthNum;
  });
};

export const sumByMonth = (expenses: Expense[] | null) => {
  if (expenses) {
    const sum = expenses
      .reduce((prev, current) => prev + current.amount, 0);
    return sum;
  }
};

export const separeteByCategories = (
  expenses: Expense[] | null,
) => {
  if (expenses) {
    const byCategories = [{
      name: "",
      value: 0
    }]
    expenses.forEach((expense) => {
      for (let category of byCategories) {
        if (category.name === expense.category) {
          category.value = category.value + expense.amount
        }
        else byCategories.push({ name: expense.category, value: expense.amount })
      }
    }
    );
    byCategories.shift()
  return byCategories}

};

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
