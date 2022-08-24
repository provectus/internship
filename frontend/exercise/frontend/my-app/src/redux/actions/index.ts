import {actions as categories} from "./categories";
import {actions as expenses} from "./expenses";
export const actions = {
    ...categories,
    ...expenses
}