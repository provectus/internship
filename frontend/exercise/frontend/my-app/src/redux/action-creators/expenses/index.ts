import axios from "axios";
import {Dispatch} from "redux";
import {getAllExpenses} from "../../urls/expenses";
import {Category, Expense} from "../../../types/api";
import {actions} from "../../actions";


export const fetchExpenses = () => async (dispatch: Dispatch) => {
    dispatch(actions.fetchExpenses());
    return await axios.get<Expense[]>(getAllExpenses()).then(response=>{
        dispatch(actions.fetchExpensesSuccess(response.data))
    }).catch(e=>{
        actions.fetchExpensesError(e.message);
    });
};

export const convertExpenses = (categories: Category[]) => async (dispatch: Dispatch) => {
    dispatch(actions.convertExpenses(categories));
}