import { API_URL } from "./constants";
import { IAddExpense } from "./types";

export const addExpense = (Expense: IAddExpense) => {
    return fetch(`${API_URL}expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Expense)
    }).then((resp) => resp.json());
}