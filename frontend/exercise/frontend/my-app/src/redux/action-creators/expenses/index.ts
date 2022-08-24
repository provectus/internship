import axios from "axios";
import {Dispatch} from "redux";
import {deleteExpenses, getAllExpenses, postExpenses, putExpenses} from "../../urls/expenses";
import {Category, Expense} from "../../../types/entities";
import {actions} from "../../actions";
import {RootState} from "../../index";
import {fetchCategories} from "../categories";


export const fetchExpenses = () => async (dispatch: Dispatch) => {
    dispatch(actions.fetchExpenses());
    return await axios.get<Expense[]>(getAllExpenses()).then(response => {
        dispatch(actions.fetchExpensesSuccess(response.data))
    }).catch(e => {
        actions.fetchExpensesError(e);
    });
};
export const deleteExpense = (_id: string) => async (dispatch: Dispatch) => {
    return await axios.delete(deleteExpenses(_id)).then(response => {
        dispatch(actions.deleteExpense(_id));
    }).catch(res => false);
}
export const updateExpense = (_id: string, amount: number, date: string, description: string) => async (dispatch: Dispatch) => {
    const payload = {amount, date, description};
    return await axios.put(putExpenses(_id), payload).then(response => {
        dispatch(actions.updateExpense({_id, ...payload}));
    }).catch(e => console.log(e));
}
export const addExpense = (categories: Category[], amount: number, date: string, description: string, category: string) => async (dispatch: Dispatch) => {
    const payload = {amount, date, description, category};
    return axios.post<Expense>(postExpenses(), payload).then(response => {
        dispatch(actions.addExpense({categories, expense: response.data}));
    })
}
export const convertExpenses = (categories: Category[]) => async (dispatch: Dispatch) => {
    dispatch(actions.convertExpenses(categories));
}

export const calculateStatistics = (expenses: Expense[], categories: Category[]) => async (dispatch: Dispatch) => {
    dispatch(actions.calculateStatistics({expenses, categories}))
}
export const fetchEverything = () => async (dispatch: Dispatch, getState: () => RootState) => {
    await fetchExpenses()(dispatch);
    await fetchCategories()(dispatch);
    const {categories} = getState().categories;
    await convertExpenses(categories)(dispatch);
}