import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const ExpenseEditScreen = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(null)
    const [category, setCategory] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorUpdate, setErrorUpdate] = useState('')
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    const [expense, setExpense] = useState(null)
    const [updatedExpense, setUpdatedExpense] = useState(false)

    const getExpense = async (id) => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(`http://localhost:5000/expenses/${id}`, config)
            // const { data } = await axios.get(`/expenses.json`, config)

            // setExpense(data['expenses'][0])
            setExpense(data)
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

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoadingUpdate(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }
            const { data } = await axios.put(
                `http://localhost:5000/expenses/${id}`,
                {
                    _id: expense._id,
                    amount,
                    date,
                    description,
                },
                config
            )
            setUpdatedExpense(true)
        } catch (errors) {
            setErrorUpdate(
                errors.response && errors.response.data.detail
                    ? errors.response.data.detail
                    : errors.message
            )
        } finally {
            setLoadingUpdate(false)
        }
    }

    useEffect(() => {
        if (updatedExpense) {
            navigate('/expenses')
        } else {
            if (!expense) {
                // if (!expense || expense._id !== Number(id)) {
                getExpense(id)
            } else {
                setDescription(expense.description)
                setAmount(expense.amount)
                setDate(expense.date.substring(0, 10))
                setCategory(expense.category)
            }
        }
    }, [expense, updatedExpense])

    return (
        <div>
            <Link to='/expenses'>Go Back</Link>

            <FormContainer>
                <h1>Edit Expense</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='amount'>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter amount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='date'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder='Enter date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='Category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default ExpenseEditScreen
