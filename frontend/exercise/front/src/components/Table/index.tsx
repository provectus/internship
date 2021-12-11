import React, { useEffect, useState } from "react";
import FormComponent from "../AddForm";
import Button from "react-bootstrap/Button";
import SearchFormComponent from "../SearchForm";
import { Categories, Expense, PostValues, URL } from "./../types";
import { getFetch, getFetchById, postFetch } from "../../api";

const styleTable = {
  border: "1px solid black",
  margin: "2px",
};

const Table: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(
    "617be036888f752511901458"
  ); //default category is Housing
  const [expenseById, setExpenseById] = useState<Expense | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCategoriesAndExpenses = async (
    set: any,
    url: string
  ): Promise<void> => {
    const data = await getFetch(url);
    set(data);
  };
  const postAndUpdate = (values: PostValues) => {
    setIsLoading(true);
    postFetch(values);
    setIsLoading(false);
  };
  const getExpenseById = async ({ id }: { id: string }) => {
    const data = await getFetchById(id);
    setExpenseById(data);
  };
  useEffect(() => {
    getCategoriesAndExpenses(setCategories, URL.CATEGORIES);
    getCategoriesAndExpenses(setExpenses, URL.EXPENSES);
  }, [isLoading]);
  console.log(expenses)
  console.log(categories)
  console.log(currentCategory)
  console.log(expenseById)
  return (
    <div>
      {categories.map((category: Categories) => (
        <button
          key={category._id + category.title}
          style={styleTable}
          onClick={() => {
            setCurrentCategory(category._id);
          }}
        >
          {category.title}
        </button>
      ))}
      <SearchFormComponent getExpenseById={getExpenseById} />
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
      {expenseById ? (
        <table style={styleTable}>
          <thead>
            <tr style={styleTable}>
              {Object.keys(expenseById).map((key) => (
                <td style={styleTable} key={key + Math.random().toString}>
                  {key}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={styleTable}>
              {Object.values(expenseById).map((values) => (
                <td style={styleTable} key={values + Math.random().toString}>
                  {values}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <table style={styleTable}>
          <thead>
            <tr style={styleTable}>
              {expenses[0]
                ? Object.keys(expenses[0]).map((key) => (
                    <td key={key + Math.random().toString} style={styleTable}>
                      {key}
                    </td>
                  ))
                : "нет данных"}
            </tr>
          </thead>
          <tbody style={styleTable}>
            {expenses
              ? expenses
                  .filter(
                    (expenseCategory: Expense) =>
                      expenseCategory.category === currentCategory
                  )
                  .slice(-10)

                  .map((expense: Expense) => (
                    <tr
                      style={styleTable}
                      key={expense.date + Math.random().toString}
                    >
                      {Object.entries(expense).map(([name, description]) => (
                        <td
                          key={name + Math.random().toString}
                          style={styleTable}
                        >
                          {description}
                        </td>
                      ))}
                    </tr>
                  ))
              : "нет данных"}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Table;
