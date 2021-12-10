import {Expense} from "../../../types/api";
import {actionStrings, actionTypes} from "../../actions/actionStrings";

interface ExpensesState {
    headers: string[]
    expenses: Expense[],
    error: string,
    loading: boolean
}

const initialState: ExpensesState = {
    headers: ["description", "amount", "date", "category"],//use in reducer Object.keys(expenses[0]) and subtract unneeded keys for scaling
    expenses: [],
    error: "",
    loading: false
}

export const reducer = (state: ExpensesState = initialState, action: actionTypes): ExpensesState => {
    switch (action.type) {
        case actionStrings.FETCH_EXPENSES:
            return {...state, loading: true}
        case actionStrings.FETCH_EXPENSES_SUCCESS:
            return {...state, expenses: action.payload, loading: false, error:""};
        case actionStrings.FETCH_EXPENSES_ERROR:
            return {...state, error: action.payload, loading: false};
        case actionStrings.CONVERT_EXPENSES:
            return {...state, expenses: state.expenses.map(expense=>({
                    ...expense,
                    date: new Date(expense.date).toLocaleString(),
                    category: action.payload.find(category => category._id === expense.category)?.title || expense.category
                }))}
        default:
            return state;
    }
}