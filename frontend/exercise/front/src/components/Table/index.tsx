import React, { useEffect, useState } from "react";
import FormComponent from "../AddForm";
import Button from "react-bootstrap/Button";
import SearchFormComponent from "../SearchForm";
import { Category, Expense, PostValues } from "./../types";
import {
  getCategories,
  getExpenses,
  getExpenseById,
  postFetch,
} from "../../api";

const styleTable = {
  border: "1px solid black",
  margin: "2px",
};

const Table = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(
    "617be036888f752511901458"
  ); //default category is Housing
  const [expenseById, setExpenseById] = useState<Expense | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isToched, setIsTouched] = useState<boolean>(false);

  const getSetCategories = async (): Promise<void> => {
    const data = await getCategories();
    setCategories(data);
  };
  const getSetExpenses = async (): Promise<void> => {
    const data = await getExpenses();
    setExpenses(data);
  };
  const postAndUpdate = (values: PostValues) => {
    setIsLoading(true);
    postFetch(values);
    setIsLoading(false);
  };
  const getSetExpenseById = async ({ id }: { id: string }) => {
    const data = await getExpenseById(id);
    setExpenseById(data);
  };
  useEffect(() => {
    getSetCategories();
    getSetExpenses();
  }, [isLoading]);

  return (
    <div>
      {categories.map((category: Category) => (
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
      <SearchFormComponent getSetExpenseById={getSetExpenseById} />
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
                          onDoubleClick={() => {
                            setIsTouched(true);
                            // expense._id
                          }}
                          key={name + Math.random().toString}
                          style={styleTable}
                        >
                          {!isToched ? (
                            description
                          ) : isToched && description === expense.amount ? (
                            <input type="text" />
                          ) : isToched && description === expense.date ? (
                            <input type="text" />
                          ) : isToched &&
                            description === expense.description ? (
                            <input type="text" />
                          ) : (
                            description
                          )}
                          {/* {description} */}
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
