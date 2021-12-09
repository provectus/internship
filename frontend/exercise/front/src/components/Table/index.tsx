import React, { useEffect, useState } from "react";
import FormComponent from "../Form";
import Button from "react-bootstrap/Button";

export interface typeCategories {
  _id: string;
  title: string;
  __v: number;
}

export interface typeExpenses {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface typePostValues {
  price: string | undefined;
  date: string;
  shop: string;
  category?: string;
  floatingSelectGrid?: string;
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
const postFetch = async ({
  price,
  date,
  shop,
  floatingSelectGrid,
}: typePostValues) => {
  const newDate = new Date(date).toISOString();
  const body = {
    amount: Number(price),
    date: newDate,
    description: shop,
    category: floatingSelectGrid,
  };
  const response = await fetch(`http://localhost:5000/${URL.EXPENSES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  await console.log(response);
  // getFetch(setExpenses, URL.EXPENSES);
};

const Table: React.FC = () => {
  const [categories, setCategories] = useState<typeCategories[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(
    "617be036888f752511901458"
  ); //default category is Housing
  const [showInput, setShowInput] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postAndUpdate = (values: typePostValues) => {
    setIsLoading(true);
    postFetch(values);
    setIsLoading(false);
  };
  useEffect(() => {
    getFetch(setCategories, URL.CATEGORIES);
    getFetch(setExpenses, URL.EXPENSES);
  }, [isLoading]);
  console.log(expenses.length);
  return (
    <div>
      {categories.map((category: typeCategories) => (
        <button
          style={styleTable}
          onClick={() => {
            setCurrentCategory(category._id);
          }}
        >
          {category.title}
        </button>
      ))}
      <div>
        {showInput ? (
          <FormComponent
            categories={categories}
            postAndUpdate={postAndUpdate}
          />
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
                    {Object.entries(expense).map(([name, description]) => (
                      <td
                        key={expense.date + expense.amount + name}
                        style={styleTable}
                      >
                        {description === expense._id ? null : description}
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
