import { API_URL } from "./constants";
import { Expense } from "src/components/Table/types";
import { _Error } from "./types";

const findExpense = (id: string): Promise<Expense | _Error> => {
    return fetch(`${API_URL}expenses/${id}`)
        .then((data) => data.json());
}

export default findExpense;