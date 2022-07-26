import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import expensesService from "../services/expenses.service"
import TextField from "../common/form/textField"
import SelectField from "../common/form/selectField"
import DatePicker from "react-datepicker"
import { useExpenses } from "../hooks/useExpenses"
import { useCategories } from "../hooks/useCategories"

const ExpenseEdit = ({ id }) => {
    const [date, setDate] = useState(new Date())
    const [dataExpense, setDataExpense] = useState([])

    const { editExpense } = useExpenses()
    const { category } = useCategories()

    const categoryList = category.map((c) => ({
        label: c.title,
        value: c._id
    }))

    const history = useHistory()

    useEffect(() => {
        getExpensesById()
    }, [])

    async function getExpensesById() {
        try {
            const content = await expensesService.getById(id)
            setDataExpense(content)
        } catch (error) {}
    }

    const handleChange = (target) => {
        setDataExpense((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newData = {
            ...dataExpense,
            date: date.toISOString()
        }
        try {
            await editExpense(id, newData)
            history.push("/")
        } catch (error) {}
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <div>Choose date</div>
                        <DatePicker
                            selected={Date.parse(dataExpense.date)}
                            onChange={(date) => {
                                setDate(date)
                            }}
                            dateFormat={"dd/MM/yyyy"}
                            maxDate={new Date()}
                            className="mb-4"
                        />
                        <TextField
                            label="Input shop's name"
                            name="description"
                            value={dataExpense.description}
                            type="text"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Input amount"
                            name="amount"
                            value={dataExpense.amount}
                            type="number"
                            onChange={handleChange}
                        />
                        <SelectField
                            name="category"
                            onChange={handleChange}
                            value={dataExpense.category}
                            label="Choose category"
                            options={categoryList}
                            defaultOption="Choose..."
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

ExpenseEdit.propTypes = {
    id: PropTypes.string.isRequired
}

export default ExpenseEdit
