import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  deleteFetch,
  getCategories,
  getExpenses,
  postFetch,
  putFetch,
} from "./api";
import "./App.css";
import ListCategories from "./components/ListCategories";
import GroupButtonFormList from "./components/GroupButtonFormList";
import { Category, Expense, PostValues } from "./types";
import Stat from "./components/Stat";
import { useCallbackStringState } from "./hooks/useCallbackStringState";
import isNumber from "./utils/isNumber";



function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentExpenses, setCurrentExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useCallbackStringState("");
  const [dataFromSearchInput, setDataFromSearchInput] =
    useCallbackStringState("");

  const preSetCurrentExpenses = () => {
    let filteredExpenses = expenses;
    if (currentCategory !== "" && !dataFromSearchInput) {
      filteredExpenses = filteredExpenses.filter((expenseCategory: Expense) => {
        return expenseCategory.category === currentCategory;
      });
    }
    if (dataFromSearchInput) {
      if (isNumber(dataFromSearchInput)) {
        filteredExpenses = filteredExpenses.filter(
          (expense) => expense.amount.toString().includes(dataFromSearchInput)
        );
      } else {
        filteredExpenses = filteredExpenses.filter(
          (expense) => expense.description.includes(dataFromSearchInput)
        );
      }
    }
    filteredExpenses.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
    setCurrentExpenses(filteredExpenses);
  };

  const escHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setCurrentCategory("");
      setDataFromSearchInput("");
    }
  }

  const getSetCategories = async (): Promise<void> => {
    const data = await getCategories();
    setCategories(data);
  };
  const getSetExpenses = async (): Promise<void> => {
    const data = await getExpenses();
    setExpenses(data);
  };
  const postAndUpdate = async (values: PostValues) => {
    setIsLoading(true);
    postFetch(values);
    setIsLoading(false);
    setCurrentCategory("");
  };
  const putAndUpdate = async (id: string, values: PostValues) => {
    setIsLoading(true);
    await putFetch(id, values);
    setIsLoading(false);
    setCurrentCategory("");
  };

  const deleteAndUpdate = async (id: string) => {
    setIsLoading(true);
    await deleteFetch(id);
    setIsLoading(false);
  };

  useEffect(() => {
    getSetCategories();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      getSetExpenses();
    }
  }, [isLoading]);
  useEffect(() => {
    preSetCurrentExpenses();
  }, [currentCategory, expenses, dataFromSearchInput]);
console.log("currentCat", currentCategory)
  return (
    <div className="App" onKeyDown={escHandle}>
      <Container className="d-flex justify-content-center p-0">
        <Col sm={3}>
          <ListCategories
            categories={categories}
            setCurrentCategory={setCurrentCategory}
            setDataFromSearchInput={setDataFromSearchInput}
          />
        </Col>

        <Col sm={6}>
          <Row>
            <GroupButtonFormList
              categories={categories}
              expenses={currentExpenses}
              postAndUpdate={postAndUpdate}
              putAndUpdate={putAndUpdate}
              deleteAndUpdate={deleteAndUpdate}
              setDataFromSearchInput={setDataFromSearchInput}
            />
          </Row>
        </Col>
        <Col sm={3}>
          <Stat expenses={expenses} categories={categories} />
        </Col>
      </Container>
    </div>
  );
}

export default App;
