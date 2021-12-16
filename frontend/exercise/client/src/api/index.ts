import axios from 'axios';

const _api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

interface Expense {
  amount: number;
  date: Date;
  description: string;
}

export const api = {
  async getCategories() {
    return (await _api.get('/categories')).data;
  },
  async getExpenses() {
    return (await _api.get('/expenses')).data;
  },

  async postExpense(expense: Expense, expenseCategory: string) {
    return await _api.post('/expenses', {
      category: expenseCategory,
      ...expense,
    });
  },

  async putExpense(id: string, expense: Expense) {
    return await _api.put(`/expenses/${id}`, {
      ...expense,
    });
  },

  async deleteExpense(id: string) {
    return await _api.delete(`/expenses/${id}`);
  },
};
