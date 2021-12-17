import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import TextField from "../common/form/textField"
import SelectField from "../common/form/selectField"
import { useCategories } from "../hooks/useCategories"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useExpenses } from "../hooks/useExpenses"

const ExpenseCreate = () => {
    const [date, setDate] = useState(new Date())
    const [data, setData] = useState({
        description: "",
        amount: 0,
        category: "",
        date: ""
    })

    const { category } = useCategories()
    const { createExpense } = useExpenses()

    const categoryList = category.map((c) => ({
        label: c.title,
        value: c._id
    }))

    const history = useHistory()

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newData = {
            ...data,
            date: date.toISOString()
        }
        try {
            await createExpense(newData)
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
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat={"dd/MM/yyyy"}
                            maxDate={date}
                            className="mb-4"
                        />
                        <TextField
                            label="Input shop's name"
                            name="description"
                            value={data.description}
                            type="text"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Input amount"
                            name="amount"
                            value={data.amount}
                            type="number"
                            onChange={handleChange}
                        />
                        <SelectField
                            name="category"
                            onChange={handleChange}
                            value={data.category}
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

export default ExpenseCreate
