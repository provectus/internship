import { Form, Container, Button, FormControlProps, Table, Modal } from 'react-bootstrap';
import React, { useEffect, useState, useRef, EventHandler} from 'react'
import { Alert } from 'antd';
import { convertLegacyProps } from 'antd/lib/button/button';
type Category={
    _id: string,
    title: string,
    __v: number
}

type PutExpense={
    amount: number,
    date: string,
    description: string,
}

type Expense={
    _id: string,
    description: string,
    amount: number,
    date: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

type Put={

    description: string,
    amount: number,
    date:  string,
    category: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
      
}

export default function Create(){

    const [categories, setCategories] = useState<Category[]>([])
    const [expenses,setExpenses] = useState<Expense[]>([])
    const [currentExpense, setNewExpense] = useState<PutExpense>({amount:0,date:"", description:""})
    const [requestResponse, setRequestResponse] = useState<Put>()
    const [show, setShow] = useState(false)
    const [path,setPath] = useState("")

    useEffect(() =>  {
        categoriesFetch()
        expensesFetch()
    },[]);

    const categoriesFetch= ()=>{
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }

    const expensesFetch = ()=>{
        fetch('http://localhost:5000/expenses')
            .then(response => response.json())
            .then(data => setExpenses(data))
    }

    const handleDescriptionChange= (e: any)=> {
        setNewExpense(prevState => {return { 
            ...prevState,
             description: e.target.value
            }})
    };

    const handleDateChange= (e: any)=> {
        setNewExpense(prevState => {return { 
            ...prevState,
             date: e.target.value
            }})
    };

    const handleAmountChange= (e: any)=> {
        setNewExpense(prevState => {return { 
            ...prevState,
             amount: e.target.value
            }})
    };
    
    const handleClose = () => setShow(false);
    const handleShow = (path: string,currentExpense: Expense) => {
        setShow(true)
        setPath(path)
        let newPutExpense : PutExpense
        newPutExpense={amount: currentExpense.amount, description:currentExpense.description, date:currentExpense.date}
        setNewExpense(newPutExpense)
    }

    const handleDelete= (path: string)=>{
        setPath(path)
        deleteRequest(path)
    }

    const updateExpense= ()=>{
        let temp= expenses
        for (let expenseIndex in temp)
        {
            if (temp[expenseIndex]._id=== path)
            {
                temp[expenseIndex]= {...temp[expenseIndex],amount: currentExpense.amount, description: currentExpense.description, date: currentExpense.date}
            }
        }
        setExpenses(temp)
    }

    const putRequest = ()=>{
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'content-type': 'application/json',
            },
            body: JSON.stringify(currentExpense)
        };
        fetch('http://localhost:5000/expenses/'+path, requestOptions)
            .then(response => response.json())
            .then(data => setRequestResponse(data ));
        updateExpense()
    }

    const deleteExpense = (path:string)=> {
        let temp= expenses
        let deletedIndex= '0'
        for (let expenseIndex=0; expenseIndex<temp.length; expenseIndex++)
        {
            if (temp[expenseIndex]._id=== path)
            {
                temp.splice(expenseIndex,1)
            }
        }
        setExpenses(temp)
    }

    const deleteRequest = (path:string)=>{
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'content-type': 'application/json',
            }
        };
        fetch('http://localhost:5000/expenses/'+path, requestOptions)
            .then(response => response.json())
            .then(data => setRequestResponse(data ));
        console.log(requestResponse)
        deleteExpense(path)
    }

    return (
        <Container>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
                {expenses.map((expense,index)=> 
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{expense.description}</td>
                    <td>{categories.find(category=> category._id===expense.category)?.title}</td>
                    <td>{expense.date}</td>
                    <td>{expense.amount}</td>
                    <td >
                        <Button onClick={()=>handleShow(expense._id,expense)}>Edit</Button>
                        <Button onClick={()=>handleDelete(expense._id)}>Delete</Button>
                    </td>
                </tr>
                )}
            </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update expense</Modal.Title>
        </Modal.Header>
        <Form onSubmit={e=> { e.preventDefault(); console.log(currentExpense); putRequest()}}>
            <Modal.Body>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={e=>{handleAmountChange(e)}} type="number"  value={currentExpense.amount.toString()} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={e=>{handleDateChange(e)}} type="text" value={currentExpense.date} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={e=>{handleDescriptionChange(e)}} type="text" value={currentExpense.description} />
                    </Form.Group>

                {console.log(currentExpense)}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
                Save Changes
            </Button>
            </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    )
}
