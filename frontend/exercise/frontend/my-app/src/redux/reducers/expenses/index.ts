import {Category, Expense} from "../../../types/entities";
import {actionStrings, actionTypes} from "../../actions/actionStrings";
import Moment from "moment";
interface ExpensesState {
    headers: string[];
    expenses: Expense[];
    error: string;
    loading: boolean;
    stats: {labels: string[], datasets: {label: string, data: number[], backgroundColor: string}[]};
    calculated: boolean;
}

const initialState: ExpensesState = {
    headers: ["Description", "Amount", "Date", "Category"],//use in reducer Object.keys(expenses[0]) and subtract unneeded keys for scaling
    expenses: [],
    error: "",
    loading: false,
    stats: {labels: [], datasets: []},
    calculated: false
}


const calculateStats = (expenses: Expense[], categories: Category[]) => {
    const getMonthWithYear = (date: Date) => date.getFullYear() * 12 + date.getMonth();
    let monthWithYears: number[] = [];
    expenses.forEach(expense => {
        const monthWithYear = getMonthWithYear(new Date(expense.date));
        if (!monthWithYears.includes(monthWithYear)) monthWithYears.push(monthWithYear);
    });
    monthWithYears = monthWithYears.sort();
    // processedExpenses is obj where key=month+year*12, value is array with all expenses from that month
    const processedExpenses: { [key: string]: Expense[] } = {}
    monthWithYears.forEach(monthWithYear => {
        expenses.forEach(expense => {
            if (getMonthWithYear(new Date(expense.date)) === monthWithYear) {
                if (!(monthWithYear in processedExpenses)) processedExpenses[monthWithYear] = [expense];
                else processedExpenses[monthWithYear].push(expense)
            }
        })
    });
    //function for summing all expenses for category (if you don't provide category it will sum for all expenses)
    const getSumExpenses = (expenses: Expense[], category?: string): number => {
        if (category) {
            return expenses.reduce((acc, expense) =>
                    expense.category === category ? acc + expense.amount : acc
                , 0);
        } else {
            return expenses.reduce((acc, expense) => acc + expense.amount, 0)
        }
    }

    const getColor = () => Math.round(Math.random() * 255);
    const datasets = categories.map(cat => ({
        label: cat.title,
        data: Object.values(processedExpenses).map(expenses => getSumExpenses(expenses, cat.title)),
        backgroundColor: `rgba(${getColor()}, ${getColor()}, ${getColor()}, 1)`
    }));
    const labels = monthWithYears.map(date => `Year ${Math.floor(date / 12)}, ${Moment.months(date % 12)}`);
    return {
        labels, datasets
    }
}


const setExpense = (expense: Expense, payload: {amount: number, date: string, description: string, _id: string}): Expense => {
    const {amount, date, description} = payload;
    return {...expense, date: new Date(date).toLocaleString(), amount, description};
}
export const reducer = (state: ExpensesState = initialState, action: actionTypes): ExpensesState => {
    switch (action.type) {
        case actionStrings.FETCH_EXPENSES:
            return {...state, loading: true}
        case actionStrings.FETCH_EXPENSES_SUCCESS:
            return {...state, expenses: action.payload, loading: false, error:""};
        case actionStrings.FETCH_EXPENSES_ERROR:
            return {...state, error: action.payload, loading: false};
        case actionStrings.CONVERT_EXPENSES:
            return {...state, expenses: state.expenses.map(expense=>({
                    ...expense,
                    date: new Date(expense.date).toLocaleString(),
                    category: action.payload.find(category => category._id === expense.category)?.title || expense.category
                }))}
        case actionStrings.CALCULATE_STATISTICS:
            const stats = calculateStats(action.payload.expenses, action.payload.categories);
            return {...state, stats, calculated: true};
        case actionStrings.UPDATE_EXPENSE:
            return {...state, expenses: state.expenses.map(expense => expense._id === action.payload._id ? setExpense(expense, action.payload) : expense)};
        case actionStrings.DELETE_EXPENSE:
            return {...state, expenses: state.expenses.filter(expense => expense._id !== action.payload)}
        case actionStrings.ADD_EXPENSE:
            const expense = {...action.payload.expense,
                category: action.payload.categories.find(
                    category => category._id === action.payload.expense.category)?.title || action.payload.expense.category,
                date: new Date(action.payload.expense.date).toLocaleString()
            };
            return {...state, expenses: [expense, ...state.expenses]}
        default:
            return state;
    }
}