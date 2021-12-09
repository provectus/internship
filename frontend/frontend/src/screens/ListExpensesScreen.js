import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'

const ListExpensesScreen = () => {
    const navigate = useNavigate()
    var today = new Date()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorCreate, setErrorCreate] = useState('')
    const [loadingCreate, setLoadingCreate] = useState(false)

    const [errorDelete, setErrorDelete] = useState('')
    const [loadingDelete, setLoadingDelete] = useState(false)

    const [expenses, setExpenses] = useState([])
    const [createdExpense, setCreatedExpense] = useState(null)
    const [deletedExpense, setDeletedExpense] = useState(null)

    const getExpenses = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(`/expenses`, config)
            // const { data } = await axios.get(`/expenses.json`, config)

            setExpenses(data)
            // setExpenses(data['expenses'])
        } catch (errors) {
            setError(
                errors.response && errors.response.data.detail
                    ? errors.response.data.detail
                    : errors.message
            )
        } finally {
            setLoading(false)
        }
    }

    const createExpenseHandler = async () => {
        try {
            setLoadingCreate(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `/expenses`,
                {
                    amount: 0,
                    date: today,
                    description: 'choose a description',
                    category: '617be036888f752511901458',
                },
                config
            )

            const dataCreated0 = {
                _id: '1',
            }
            setCreatedExpense(data)
        } catch (errors) {
            setErrorCreate(
                errors.response && errors.response.data.detail
                    ? errors.response.data.detail
                    : errors.message
            )
        } finally {
            setLoadingCreate(false)
        }
    }

    const deleteExpenseHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                setLoadingDelete(true)
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
                const { data } = await axios.delete(`/expenses/${id}`, config)
                setDeletedExpense(data)
            } catch (errors) {
                setErrorDelete(
                    errors.response && errors.response.data.detail
                        ? errors.response.data.detail
                        : errors.message
                )
            } finally {
                setLoadingDelete(false)
            }
        }
    }

    useEffect(() => {
        if (createdExpense) {
            navigate(`/expense/${createdExpense._id}/edit`)
            setCreatedExpense(null)
        } else if (deletedExpense) {
            setDeletedExpense(null)
        }
        getExpenses()
    }, [navigate, createdExpense, deletedExpense])

    return (
        <div>
            <Link to='/'>Go Back</Link>

            <Row className='align-items-center'>
                <Col>
                    <h1>Expenses</h1>
                </Col>

                <Col className='text-right'>
                    <div style={{ display: 'flex' }}>
                        <Button
                            className='my-3'
                            style={{ marginLeft: 'auto' }}
                            onClick={createExpenseHandler}
                        >
                            <i className='fas fa-plus'></i> Create Expense
                        </Button>
                    </div>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIPTION</th>
                                <th>AMOUNT</th>
                                <th>DATE</th>
                                <th>CATEGORY</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense._id}>
                                    <td>{expense._id}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>

                                    <td>
                                        <LinkContainer to={`/expense/${expense._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteExpenseHandler(expense._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default ListExpensesScreen
