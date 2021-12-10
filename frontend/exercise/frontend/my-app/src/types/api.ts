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
    category: string;//==category._id
    createdAt: string;
    updatedAt: string;
    __v: number
}