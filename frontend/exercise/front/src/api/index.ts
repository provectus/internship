import { Expense, Category, PostValues, URL } from "../components/types";
const SERVER_API = 'http://localhost:5000/'

const getFetch = async <Type>(url: string): Promise<Type> => {
  const response = await fetch(`${SERVER_API}${url}`);
  return await response.json();
};
export const getCategories = async () => {
  return getFetch<Category[]>(URL.CATEGORIES);
};

export const getExpenses = async () => {
  return getFetch<Expense[]>(URL.EXPENSES);
};

export const getExpenseById = async (id: string): Promise<Expense> => {
  return getFetch<Expense>(`${URL.EXPENSES}/${id}`);
};

export const postFetch = async ({
  price,
  date,
  shop,
  category,
  floatingSelectGrid,
}: PostValues) => {
  if (!floatingSelectGrid) {
    floatingSelectGrid = category;
  }
  const newDate = new Date(date).toISOString();
  const body = {
    amount: Number(price),
    date: newDate,
    description: shop,
    category: floatingSelectGrid,
  };
  await fetch(`${SERVER_API}${URL.EXPENSES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
};
