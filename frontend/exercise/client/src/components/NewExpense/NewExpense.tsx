import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'
import { useForm } from "react-hook-form";
import Input from '../Input/Input';
import categoriesService from '../../services/categoriesService';
import { ExpenseDataInterface } from '../../types'

interface ExpenseFromProps {
  onSubmit: (data: ExpenseDataInterface) => void,
  defaultValues: ExpenseDataInterface,
}

function NewExpenses({ onSubmit, defaultValues }: ExpenseFromProps) {
  const methods = useForm({ defaultValues })
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      let data = await categoriesService.getCategories()
      if (loading) setOptions(data)
    }
    fetchCategories()
    return () => { setLoading(false) }
  })

  return loading ? (<p>loading...</p>) : (
    <Form onSubmit={onSubmit} methods={methods}>
      <Input name="description" type="text" control={methods.control} rules={{ required: { message: 'Description is required!', value: true } }} />
      <Input name="amount" type="number" control={methods.control} rules={{ required: { message: 'Amount is required!', value: true }, min: { message: "Amount couldn't be less than 0.01", value: 0.01 } }} />
      <Input name="date" type="datetime-local" control={methods.control} rules={{ required: { message: 'Date is required!', value: true } }} />
      <Input name="category" type="select" options={options} control={methods.control} rules={{ required: { message: 'Category is required!', value: true } }} />
      <button type="submit">Submit</button>
    </Form>
  )
}

export default NewExpenses