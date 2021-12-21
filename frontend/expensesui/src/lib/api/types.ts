export interface CommonExpenseProps{
    description: string;
    amount: number;
    date: string;
}
export interface IAddExpense extends CommonExpenseProps{
    category: string;    
    createdAt?: string;
    updateAt?: string;
}

export interface _Error{
    error: string;
}