import { API_URL } from "./constants";
import { Category } from "src/components/Table/types";

const getCategories = (): Promise<Category[]> => {
    return fetch(`${API_URL}categories`)
        .then((data) => data.json());
}

export default getCategories;