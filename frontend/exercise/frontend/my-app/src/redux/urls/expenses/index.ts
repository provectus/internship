import {api} from "../../../config/api";

const getAllExpenses = () => `${api.URL}:${api.PORT}/${api.API.EXPENSES}`;

const postExpenses = getAllExpenses;

const getExpenses = (id: string) => `${api.URL}:${api.PORT}/${api.API.EXPENSES}/${id}`;

const putExpenses = getExpenses;

const deleteExpenses = getExpenses;

export {getExpenses, getAllExpenses, postExpenses, putExpenses, deleteExpenses};
