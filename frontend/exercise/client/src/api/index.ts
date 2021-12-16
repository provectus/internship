import axios from 'axios';

const _api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

interface Expense {
  amount: number;
  date: string;
  description: string;
}

export const api = {
  async getCategories() {
    return (await _api.get('/categories')).data;
  },
  async getExpenses() {
    return (await _api.get('/expenses')).data;
  },

  async postExpense(expense: Expense, expenseCategoryId: string) {
    console.log({ ...expense });
    return await _api.post(
      '/expenses',
      {
        category: expenseCategoryId,
        ...expense,
      },
      {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  },

  async putExpense(id: string, expense: Expense) {
    console.log({ ...expense });
    return await _api.put(
      `/expenses/${id}`,
      {
        ...expense,
      },
      {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  },

  async deleteExpense(id: string) {
    return await _api.delete(`/expenses/${id}`);
  },
};
