import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Expense = ({ request }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/request/${request._id}`}>
                <Card.Img src={request.image} />
            </Link>

            <Card.Body>
                <Link to={`/request/${request._id}`}>
                    <Card.Title as='div'>
                        <strong>{request.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className='my-3'>
                        <strong>{request.description}</strong>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Expense
