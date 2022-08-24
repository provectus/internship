import {Dispatch} from "redux";
import {actions} from "../../actions";
import axios from "axios";
import {Category} from "../../../types/entities";
import {getCategories} from "../../urls/categories";

export const fetchCategories = () => async (dispatch: Dispatch) => {
    dispatch(actions.fetchCategories());
    return await axios.get<Category[]>(getCategories()).then(response=>{
        dispatch(actions.fetchCategoriesSuccess(response.data))
    }).catch(e=>{
        actions.fetchCategoriesError(e.message);
    });
};