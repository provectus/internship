export interface ExpenseInterface {
  _id: string,
  description: string,
  amount: number,
  category: string,
  date: string,
  createdAt: string,
  updatedAt: string
};

export interface ExpenseDataInterface {
  description: string,
  amount: number,
  date: string,
  category: string,
};

export interface CategoryInterface {
  _id: string,
  title: string,
};

export interface SortedCategoryInterface {
  id: string,
  title: string,
  content: ExpenseInterface[],
  amount: number,
}