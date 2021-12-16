import {Category, Expense, ExpensesWithCategories} from "../../../types/entities";
import {actionStrings} from "../actionStrings";

export const actions = {
    fetchExpensesSuccess: (payload: Expense[]) => ({
        type: actionStrings.FETCH_EXPENSES_SUCCESS,
        payload
    }),
    fetchExpensesError: (payload: string) => ({
        type: actionStrings.FETCH_EXPENSES_ERROR,
        payload
    }),
    fetchExpenses: () => ({
        type: actionStrings.FETCH_EXPENSES
    }),
    convertExpenses: (payload: Category[]) => ({
        type: actionStrings.CONVERT_EXPENSES,
        payload
    }),
    calculateStatistics: (payload: ExpensesWithCategories) => ({
        type: actionStrings.CALCULATE_STATISTICS,
        payload
    }),
    deleteExpense: (payload: string) => ({
        type: actionStrings.DELETE_EXPENSE,
        payload
    }),
    updateExpense: (payload: {amount: number, date: string, description: string, _id: string}) => ({
        type: actionStrings.UPDATE_EXPENSE,
        payload
    }),
    addExpense: (payload: {categories: Category[], expense:Expense}) => ({
        type: actionStrings.ADD_EXPENSE,
        payload
    })

}