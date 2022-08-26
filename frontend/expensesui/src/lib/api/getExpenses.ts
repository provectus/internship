import { API_URL } from "./constants";
import { Expense } from "src/components/Table/types";

const getExpenses = (): Promise<Expense[]> => {
    return fetch(`${API_URL}expenses`)
        .then((data) => data.json());
}

export default getExpenses;