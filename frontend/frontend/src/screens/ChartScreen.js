import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'

const ChartScreen = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [expenses, setExpenses] = useState([])

    const getExpenses = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(`http://localhost:5000/expenses`, config)
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

    useEffect(() => {
        getExpenses()
    }, [expenses])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default ChartScreen
