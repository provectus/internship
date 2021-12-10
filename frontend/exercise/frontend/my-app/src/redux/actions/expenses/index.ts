import {Category, Expense} from "../../../types/api";
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
    })


}