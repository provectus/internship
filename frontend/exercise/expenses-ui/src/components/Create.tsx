import { Form, Container, Button, FormControlProps } from 'react-bootstrap';
import React, { useEffect, useState, useRef, EventHandler} from 'react'
type Category={
    _id: string,
    title: string,
    __v: number
}

type Expense={
    amount: number,
    date: string,
    description: string,
    category: string
}

type Post={

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
    const [newExpense, setNewExpense] = useState<Expense>({amount:0,date:"", description:"", category:""})
    const [post, setPost] = useState<Post>()
    
    useEffect(() =>  {
        categoriesFetch()
    },[]);

    const categoriesFetch= ()=>{
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }

    const handleCategoryChange= (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setNewExpense(prevState => {return { 
            ...prevState,
             category: e.target.value
            }})
    };

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

    const postRequest = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
            },
            body: JSON.stringify(newExpense)
        };
        fetch('http://localhost:5000/expenses', requestOptions)
            .then(response => response.json())
            .then(data => setPost(data ));
        console.log(post)
    }
    

    return (
        <Container>
            <Form onSubmit={e=> { e.preventDefault(); console.log(newExpense); postRequest()}}>
                <Form.Label column="lg"> Create a new Expense</Form.Label>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control onChange={e=>{handleAmountChange(e)}} type="number" placeholder="Amount" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control onChange={e=>{handleDateChange(e)}} type="text" placeholder="Date" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control onChange={e=>{handleDescriptionChange(e)}} type="text" placeholder="Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Select onChange={e=>{handleCategoryChange(e)}}>
                        <option key={0} value={0}>Select category</option>
                        {categories.map(category=> <option key={category._id} value={category._id}>{category.title}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </Container>
    )
}
