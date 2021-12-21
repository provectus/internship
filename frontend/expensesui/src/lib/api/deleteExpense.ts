import { API_URL } from "./constants";

const deleteExpense = (id: string) => {
    return fetch(`${API_URL}expenses/${id}`, {
        method: 'DELETE',
    }).then((resp) => resp.json());
}

export default deleteExpense;