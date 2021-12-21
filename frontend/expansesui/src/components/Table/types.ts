export interface Expense{
    _id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    createdAt?: string;
    updateAt?: string;
}

export interface Category{
    _id: string;
    title: string;
}

export interface TableProps{
    data: Expense[];
    updateData: (index: number, expense: Expense) => void;
    deleteData: (index: number) => void;
} 

export interface RowProps{
    expense: Expense;
    index: number;
    update: (expense: Expense) => void;
    _delete: () => void;
}
