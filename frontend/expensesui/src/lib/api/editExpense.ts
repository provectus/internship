import { API_URL } from "./constants";
import { CommonExpenseProps } from "./types";

const editExpense = (id: string, Expense: CommonExpenseProps) => {
    return fetch(`${API_URL}expenses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Expense)
    }).then((resp) => resp.json());
}

export default editExpense;