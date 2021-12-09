import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'

function HomeScreen({ history }) {
    useEffect(() => {}, [])

    return (
        <Container>
            <Row className='justify-content-md-center my-5'>
                <h1 class='text-center'>Please select an action</h1>

                <Col xs={12} md={4} lg={4}>
                    <Card className='my-3 p-3 rounded'>
                        <Link to={`/expenses/`}>
                            <Card.Img src={'/images/crud.png'} />
                        </Link>

                        <Card.Body>
                            <Link to={`/expenses/`}>
                                <Card.Title as='div'>
                                    <strong>CRUD</strong>
                                </Card.Title>
                            </Link>

                            <Card.Text as='div'>
                                <div className='my-3'>
                                    <strong>display / create / update / delete expenses</strong>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={4} lg={4}>
                    <Card className='my-3 p-3 rounded'>
                        <Link to={`/chart/`}>
                            <Card.Img src={'/images/chart.jpg'} />
                        </Link>

                        <Card.Body>
                            <Link to={`/chart/`}>
                                <Card.Title as='div'>
                                    <strong>list</strong>
                                </Card.Title>
                            </Link>

                            <Card.Text as='div'>
                                <div className='my-3'>
                                    <strong>
                                        displays a chart that shows spending stats/statistics by
                                        month and spending category
                                    </strong>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen
