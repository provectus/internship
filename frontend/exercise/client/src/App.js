import React from "react"
import Expenses from "./layouts/expenses"
import { Route, Switch, Redirect } from "react-router-dom"
import ExpensesProvider from "./hooks/useExpenses"
import ExpenseCreate from "./pages/expenseCreate"
import CategoriesProvider from "./hooks/useCategories"
import ExpensesList from "./pages/expensesList"

function App() {
    return (
        <>
            <CategoriesProvider>
                <ExpensesProvider>
                    <Switch>
                        <Route
                            path="/expenses/:id?/:edit?"
                            component={Expenses}
                        />
                        <Route path="/create" component={ExpenseCreate} />
                        <Route path="/" exact component={ExpensesList} />
                        <Redirect to="/" />
                    </Switch>
                </ExpensesProvider>
            </CategoriesProvider>
        </>
    )
}

export default App
