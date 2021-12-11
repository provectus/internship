
export interface Category {
  _id: string;
  title: string;
  __v: number;
}

export interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostValues {
  price: string | undefined;
  date: string;
  shop: string;
  category?: string;
  floatingSelectGrid?: string;
}

export enum URL {
  CATEGORIES = "categories",
  EXPENSES = "expenses",
}
