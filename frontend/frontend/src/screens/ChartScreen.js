import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'

const ChartScreen = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [expenses, setExpenses] = useState([])

    const [errorCategories, setErrorCategories] = useState('')
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [categories, setCategories] = useState([])
    const [month, setMonth] = useState('')
    const months = [
        'january',
        'february',
        'mars',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
    ]
    const getExpenses = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(`http://localhost:5000/expenses`, config)

            setExpenses(data)
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

    const getCategories = async () => {
        try {
            setLoadingCategories(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(`http://localhost:5000/categories`, config)

            setCategories(data)
        } catch (errors) {
            setErrorCategories(
                errors.response && errors.response.data.detail
                    ? errors.response.data.detail
                    : errors.message
            )
        } finally {
            setLoadingCategories(false)
        }
    }

    useEffect(() => {
        getExpenses()
        getCategories()
    }, [month])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Row>
                        <Col md={4} lg={4}>
                            <Form.Control
                                as='select'
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                {months.map((x) => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>SPENDING</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category._id}</td>
                                        <td>{category.title}</td>

                                        <td>
                                            {expenses.reduce((acc, expense) => {
                                                if (
                                                    expense.category == category._id &&
                                                    months[Number(expense.date.substring(5, 7))] ===
                                                        month
                                                ) {
                                                    return acc + expense.amount
                                                } else {
                                                    return acc
                                                }
                                            }, 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </div>
            )}
        </div>
    )
}

export default ChartScreen
