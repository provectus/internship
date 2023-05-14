import React,{useEffect, useState}from 'react'
import { Column } from '@ant-design/charts';
import 'antd/dist/antd.css'; 
import './Display.css'
import { Container ,Row} from 'react-bootstrap';
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
type Category={
    _id: string,
    title: string,
    __v: number
}

export default function Display(){
    const [expenses,setExpenses] = useState<Expense[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() =>  {
        expensesFetch()
        categoriesFetch()
    },[]);

    const expensesFetch = ()=>{
        fetch('http://localhost:5000/expenses')
            .then(response => response.json())
            .then(data => setExpenses(data))
    }

    const categoriesFetch= ()=>{
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }

    const getExpensesPerCategory = (expenses: Expense[], categories: Category[])=>{
        const ret = categories.map(category=> {return {amount:0, category: category.title}})
        for (let categoryIndex in categories)
        {
            for (let expense of expenses)
            {
                if (expense.category === categories[categoryIndex]._id)
                    ret[categoryIndex].amount+= expense.amount
            }
        }
        return ret;
    }

    const DemoColumn = () => {
        const data = getExpensesPerCategory(expenses,categories);
        const config = {
          data,
          xField: 'category',
          yField: 'amount',
          columnWidthRatio: 0.8,
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          },
          meta: {
            amount: {
                alias: 'Amount',
                }
            
          },
        };
        return <Column {...config} />;
      };
    return (
        <div id="footer">
                {expenses.length!==0&&DemoColumn()}
        </div>
    )

}