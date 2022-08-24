import {Category, Expense, ExpensesWithCategories} from "../../types/entities";

export enum actionStrings {
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
    FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",

    FETCH_EXPENSES = "FETCH_EXPENSES",
    FETCH_EXPENSES_ERROR = "FETCH_EXPENSES_ERROR",
    FETCH_EXPENSES_SUCCESS = "FETCH_EXPENSES_SUCCESS",

    CONVERT_EXPENSES = "CONVERT_EXPENSES",
    CALCULATE_STATISTICS = "CALCULATE_STATISTICS",

    DELETE_EXPENSE = "DELETE_EXPENSE",
    UPDATE_EXPENSE = "UPDATE_EXPENSE",
    ADD_EXPENSE = "ADD_EXPENSE"
}

interface fetchCategoriesSuccess {
    type: actionStrings.FETCH_CATEGORIES_SUCCESS;
    payload: Category[]
}

interface fetchCategoriesError {
    type: actionStrings.FETCH_CATEGORIES_ERROR;
    payload: string
}

interface fetchCategories {
    type: actionStrings.FETCH_CATEGORIES
}


interface fetchExpensesSuccess {
    type: actionStrings.FETCH_EXPENSES_SUCCESS;
    payload: Expense[]
}

interface fetchExpensesError {
    type: actionStrings.FETCH_EXPENSES_ERROR;
    payload: string
}

interface fetchExpenses {
    type: actionStrings.FETCH_EXPENSES
}

interface convertExpenses {
    type: actionStrings.CONVERT_EXPENSES;
    payload: Category[]
}

interface calculateStatistics {
    type: actionStrings.CALCULATE_STATISTICS;
    payload: ExpensesWithCategories
}

interface deleteExpense {
    type: actionStrings.DELETE_EXPENSE;
    payload: string
}
interface updateExpense {
    type: actionStrings.UPDATE_EXPENSE;
    payload: {amount: number, _id: string, description: string, date: string}
}
interface addExpense {
    type: actionStrings.ADD_EXPENSE;
    payload: {categories: Category[], expense: Expense}
}
export type actionTypes = fetchCategories | fetchCategoriesError | fetchCategoriesSuccess |
    fetchExpenses | fetchExpensesError | fetchExpensesSuccess |
    convertExpenses | calculateStatistics |
    deleteExpense | updateExpense | addExpense;