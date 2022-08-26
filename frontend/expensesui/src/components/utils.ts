import { Expense, Category } from "./Table/types"

export const mapCategoryIdTitle = (expenses: Expense[], categories: Category[]): Expense[] => {
    return expenses.map(
        (expense: Expense) => {
            const getCategoryTitle = categories.find((category: Category) => category._id === expense.category)?.title;
            return {
                ...expense,
                category: !!getCategoryTitle ? getCategoryTitle : expense.category
            }
        }
    )
}