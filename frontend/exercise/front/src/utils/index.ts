import { CategoryAmount, Category, Expense } from "../types";

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
    const sum = expenses.reduce((prev, current) => prev + current.amount, 0);
    return sum;
  }
};

export const separateByCategories = (expenses: Expense[] | null, categories: Category[]) => {
  if (!expenses) {
    return;
  }

  const byCategories: CategoryAmount[] = [];
  for (let expense of expenses) {
    let found = false;

    for (let category of byCategories) {
      if (category.name === expense.category) {
        category.value = category.value + expense.amount;
        found = true;
        break;
      }
    }
    if (!found) {
      byCategories.push({ name: expense.category, value: expense.amount });
    }
  }
  for (let categoryAmount of byCategories) {
    for (let category of categories) {
      if (category._id === categoryAmount.name) {
        categoryAmount.name = category.title;
      } 
    }
  }
  return byCategories
};
