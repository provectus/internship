import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const ExpenseEditScreen = ({ match, history }) => {
    // const expenseId = match.params.id
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorUpdate, setErrorUpdate] = useState('')
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    useEffect(() => {}, [])

    const submitHandler = (e) => {
        e.preventDefault()
    }

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
