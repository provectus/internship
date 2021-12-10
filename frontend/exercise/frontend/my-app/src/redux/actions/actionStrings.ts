import {Category, Expense} from "../../types/api";

export enum actionStrings {
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
    FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",

    FETCH_EXPENSES = "FETCH_EXPENSES",
    FETCH_EXPENSES_ERROR = "FETCH_EXPENSES_ERROR",
    FETCH_EXPENSES_SUCCESS = "FETCH_EXPENSES_SUCCESS",

    CONVERT_EXPENSES = "CONVERT_EXPENSES"
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

export type actionTypes = fetchCategories | fetchCategoriesError | fetchCategoriesSuccess |
    fetchExpenses | fetchExpensesError | fetchExpensesSuccess | convertExpenses;