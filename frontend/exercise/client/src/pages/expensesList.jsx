import React, { useState } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "../common/pagination"
import Category from "../ui/category"
import { dateForm } from "../utils/dateForm"
import { useHistory } from "react-router-dom"
import { useExpenses } from "../hooks/useExpenses"
import FilterList from "../common/filterList"
import { useCategories } from "../hooks/useCategories"

const ExpensesList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [categorySelect, setCategorySelect] = useState()
    const [visible, setVisible] = useState(true)

    const history = useHistory()

    const { expenses, deleteExpense } = useExpenses()
    const { category } = useCategories()

    const pageSize = 20

    const sumAmount = (expensesAmount) => {
        let totalAmount = 0
        expensesAmount.forEach((expense) => (totalAmount += expense.amount))
        return totalAmount
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filteredExpenses = categorySelect
        ? expenses.filter((item) => item.category === categorySelect._id)
        : expenses
    const count = filteredExpenses.length
    const expensesCrop = paginate(filteredExpenses, currentPage, pageSize)

    const handleSelect = (item) => {
        setCategorySelect(item)
    }

    const clearFilter = () => {
        setCategorySelect()
    }

    const handleDelete = (id) => {
        deleteExpense(id)
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <button
                        className="btn btn-success"
                        onClick={() => history.replace(`/create`)}
                    >
                        Add new expense
                    </button>
                </div>
                <div>
                    <h1>
                        {`Total Amount: ${sumAmount(
                            expenses
                        ).toLocaleString()}`}
                    </h1>
                    <h2>
                        {`Total Amount for choosen category: ${sumAmount(
                            filteredExpenses
                        ).toLocaleString()}`}
                    </h2>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Shop</th>
                        <th
                            role="button"
                            onClick={() => setVisible(!visible)}
                            scope="col"
                            className="dropdown-toggle"
                        >
                            Category (choose)
                            {
                                /*eslint-disable*/
                                visible ? null : (
                                    <FilterList
                                        items={category}
                                        onItemSelect={handleSelect}
                                        onClear={clearFilter}
                                    />
                                )
                                /*eslint-disable*/
                            }
                        </th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {expensesCrop.map((item) => (
                        <tr key={item._id}>
                            <td>{dateForm(item.date)}</td>
                            <td>{item.description}</td>
                            <td>{<Category id={item.category} />}</td>
                            <td>{item.amount}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        history.replace(
                                            `expenses/${item._id}/edit`
                                        )
                                    }
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default ExpensesList
