import React, { useEffect, useState } from "react";
import FormComponent from "../Form";
import Button from 'react-bootstrap/Button'

interface typeCategories {
  _id: string;
  title: string;
  __v: number;
}

interface typeExpenses {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

enum URL {
  CATEGORIES = "categories",
  EXPENSES = "expenses",
}

const styleTable = {
  border: "1px solid black",
  margin: "2px",
};

const getFetch = async (set: any, url: string): Promise<void> => {
  const response = await fetch(`http://localhost:5000/${url}`);
  const data = await response.json();
  set(data);
};

const Table: React.FC = () => {
  const [categories, setCategories] = useState<any>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  useEffect(() => {
    getFetch(setCategories, URL.CATEGORIES);
    getFetch(setExpenses, URL.EXPENSES);
  }, []);
  console.log(currentCategory);
  return (
    <div>
      {categories.map((category: typeCategories) => (
        <button
          style={styleTable}
          onClick={() => {
            // console.log(category._id);
            setCurrentCategory(category._id);
          }}
        >
          {category.title}
        </button>
      ))}
      <div>
      {showInput ? (
              <FormComponent />
            ) : (
              <Button onClick={() => setShowInput(true)}>Add</Button>
            )}
        </div>
      <table style={styleTable}>
        <thead>
          <tr style={styleTable}>
            {expenses[0]
              ? Object.entries(expenses[0]).map(([name]) => (
                  <td key={name} style={styleTable}>
                    {name}
                  </td>
                ))
              : "нет данных"}
          </tr>
        </thead>
        <tbody style={styleTable}>
          {expenses
            ? expenses
                .filter(
                  (expenseCategory: typeExpenses) =>
                    expenseCategory.category === currentCategory
                )
                .map((expense: typeExpenses) => (
                  <tr style={styleTable} key={expense.date}>
                    {Object.entries(expense).map(([name, discription]) => (
                      <td
                        key={expense.date + expense.amount + name}
                        style={styleTable}
                      >
                        {discription === expense._id ? null : discription}
                      </td>
                    ))}
                  </tr>
                ))
            : "нет данных"}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
