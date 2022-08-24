import {combineReducers} from "redux";
import {reducer as categories} from "./categories";
import {reducer as expenses} from "./expenses";
export const rootReducer = combineReducers({
    categories,
    expenses
})