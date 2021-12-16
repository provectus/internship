import {Category} from "../../../types/entities";
import {actionStrings, actionTypes} from "../../actions/actionStrings";

interface CategoriesState {
    categories: Category[],
    error: string,
    loading: boolean
}

const initialState: CategoriesState = {
    categories: [],
    error: "",
    loading: false
}

export const reducer = (state: CategoriesState = initialState, action: actionTypes): CategoriesState => {
    switch (action.type) {
        case actionStrings.FETCH_CATEGORIES:
            return {...state, loading: true}
        case actionStrings.FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload, loading: false, error: ""};
        case actionStrings.FETCH_CATEGORIES_ERROR:
            return {...state, error: action.payload, loading: false}
        default:
            return state;
    }
}