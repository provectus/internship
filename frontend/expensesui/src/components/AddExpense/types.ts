import { Expense } from "../Table/types";

export interface AddExpenseProps{
    openModal: boolean;
    closeModal: () => void;
    add: (expense: Expense) => void;
}