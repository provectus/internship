import { PostValues, URL } from "../components/types";

export const getFetch = async (url: string): Promise<void> => {
  const response = await fetch(`http://localhost:5000/${url}`);
  return await response.json();
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
  await fetch(`http://localhost:5000/${URL.EXPENSES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
};

export const getFetchById = async (id: string) => {
  const response = await fetch(`http://localhost:5000/${URL.EXPENSES}/${id}`);
  const data = await response.json();
  return data;
};