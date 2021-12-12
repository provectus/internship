import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, ListGroup, Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import BarChart from '../components/BarChart'

const ChartScreen = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [expenses, setExpenses] = useState([])

    const [errorCategories, setErrorCategories] = useState('')
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [categories, setCategories] = useState([])
    const [chartData, setchartData] = useState({})

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

    const generate_chart_data = () => {
        var categors = []
        var spendings = []

        categories.map((category) => {
            categors.push(category.title)
            spendings.push(
                expenses.reduce((acc, expense) => {
                    if (
                        expense.category == category._id &&
                        months[Number(expense.date.substring(5, 7))] === month
                    ) {
                        return acc + expense.amount
                    } else {
                        return acc
                    }
                }, 0)
            )
        })

        var chartData = {
            labels: categors,
            datasets: [
                {
                    label: 'spending statistics',
                    data: spendings,
                    backgroundColor: [
                        '#ffbb11',
                        '#ecf0f1',
                        '#50AF95',
                        '#f3ba2f',
                        '#2a71d0',
                        '#ffbb11',
                        '#ecf0f1',
                        '#50AF95',
                        '#f3ba2f',
                        '#2a71d0',
                    ],
                },
            ],
        }
        return chartData
    }

    useEffect(() => {
        getExpenses()
        getCategories()
        setchartData(generate_chart_data())
    }, [month])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row className='justify-content-md-center my-5'>
                            <h1 class='text-center'>Please select a month</h1>
                        </Row>

                        <Row className='justify-content-md-center my-5'>
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
                    </ListGroup.Item>

                    <ListGroup.Item>
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
                                                        months[
                                                            Number(expense.date.substring(5, 7))
                                                        ] === month
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
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <BarChart>{chartData}</BarChart>
                    </ListGroup.Item>
                </ListGroup>
            )}
        </div>
    )
}

export default ChartScreen
