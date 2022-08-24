import {api} from "../../../config/api";

const getCategories = () => `${api.URL}:${api.PORT}/${api.API.CATEGORIES}`;


export {getCategories};