import {Category} from "../../../types/entities";
import {actionStrings} from "../actionStrings";

export const actions = {
    fetchCategoriesSuccess: (payload: Category[]) => ({
        type: actionStrings.FETCH_CATEGORIES_SUCCESS,
        payload
    }),
    fetchCategoriesError: (payload: string) => ({
        type: actionStrings.FETCH_CATEGORIES_ERROR,
        payload
    }),
    fetchCategories: () => ({
        type: actionStrings.FETCH_CATEGORIES
    }),
}