import { Expense } from "../Table/types";

export interface SearchProps{
    setSearchResults: (expenses: Expense[]) => void;
}