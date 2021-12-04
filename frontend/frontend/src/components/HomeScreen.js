import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import axios from 'axios'
import Message from './Message'
import Loader from './Loader'
import requests from '../requests'
import Request from './Request'

function HomeScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setError('')
        setResponse('')

        const notif = {
            name: name,
            subject: subject,
            email: email,
            phoneNumber: phone,
            message: message,
        }
        sendData(notif)
    }

    const sendData = async (notif) => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(`/api/`, notif, config)

            setResponse(data['detail'])
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
        setName('')
        setEmail('')
        setMessage('')
        setPhone('')
        setSubject('')
    }, [response, error])

    return (
        <Container>
            <Row className='justify-content-md-center my-5'>
                <Col xs={12} md={7} lg={7}>
                    <h1 class='text-center'>Please select an action</h1>

                    {loading && <Loader />}
                    {response && <Message variant='info'>{response}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}

                    <div>
                        <Row>
                            {requests.map((request) => (
                                <Col key={request._id} sm={12} md={6} lg={4} xl={3}>
                                    <Request request={request} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen
