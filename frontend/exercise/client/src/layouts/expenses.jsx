import React from "react"
import { useParams } from "react-router-dom"
import ExpenseEdit from "../pages/expenseEdit"
import ExpensesList from "../pages/expensesList"

const Expenses = () => {
    const params = useParams()
    const { edit, id } = params

    return <>{edit ? <ExpenseEdit id={id} /> : <ExpensesList />}</>
}

export default Expenses
