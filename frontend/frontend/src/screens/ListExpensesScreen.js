import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ListExpensesScreen = ({ match }) => {
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorCreate, setErrorCreate] = useState('')
    const [loadingCreate, setLoadingCreate] = useState(false)

    const [errorDelete, setErrorDelete] = useState('')
    const [loadingDelete, setLoadingDelete] = useState(false)

    const [expenses, setExpenses] = useState([])
    const [createdExpense, setCreatedExpense] = useState(null)

    const getExpenses = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            // const { data } = await axios.get(`/api/`, notif, config)
            const { data } = await axios.get(`/expenses.json`, config)

            setExpenses(data['expenses'])
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

    const createExpenseHandler = (expense) => {
        try {
            setLoadingCreate(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }

            // const { data } = await axios.post(`/api/expenses/create/`, {}, config)
            const dataCreated = {
                _id: '1',
                description: 'Magnit',
                amount: 496865,
                date: '2021-07-05T08:22:09.068Z',
                category: '617be036888f752511901458',
                createdAt: '2021-10-29T11:51:18.805Z',
                updatedAt: '2021-10-29T11:51:18.805Z',
                __v: 0,
            }
            setCreatedExpense(dataCreated)
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

    const deleteExpenseHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                setLoadingDelete(true)
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
                // const { data } = await axios.delete(`/api/expenses/delete/${id}/`, config)
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
            // history.push(`/expense/${createdExpense._id}/edit`)
        } else {
            getExpenses()
        }
    }, [navigate, createdExpense])

    return (
        <div>
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
