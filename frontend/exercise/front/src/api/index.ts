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
  const data = await getFetch<Expense[]>(URL.EXPENSES);
  return data.slice(-100)
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

export const putFetch = async (id: string, {
  price,
  date,
  shop
}: Pick<PostValues, "price" | "date" | "shop">) => {
  const newDate = new Date(date).toISOString();
  const body = {
    amount: Number(price),
    date: newDate,
    description: shop,
  };
  await fetch(`${SERVER_API}${URL.EXPENSES}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
};

export const deleteFetch = async (id: string) => {
  await fetch(`${SERVER_API}${URL.EXPENSES}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};