import React, { useContext, useEffect, useState } from "react"
import expensesService from "../services/expenses.service"
import PropTypes from "prop-types"
import { toast } from "react-toastify"

const ExpenseContext = React.createContext()

export const useExpenses = () => {
    return useContext(ExpenseContext)
}

const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getExpenses()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function getExpenses() {
        try {
            const content = await expensesService.get()
            setExpenses(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function deleteExpense(id) {
        try {
            await expensesService.delete(id)
            getExpenses()
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function createExpense(data) {
        try {
            await expensesService.post(data)
            getExpenses()
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function editExpense(id, data) {
        try {
            await expensesService.put(id, data)
            getExpenses()
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        console.log(error.response)
        const { message } = error.response.data
        setError(message)
    }

    return (
        <ExpenseContext.Provider
            value={{ expenses, deleteExpense, createExpense, editExpense }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}

ExpensesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ExpensesProvider
