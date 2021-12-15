import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  deleteFetch,
  getCategories,
  getExpenseById,
  getExpenses,
  postFetch,
  putFetch,
} from "./api";
import "./App.css";
import ListCategories from "./components/ListCategories";
import GroupButtonFormList from "./components/GroupButtonFormList";
import { Category, Expense, PostValues } from "./types";
import Stat from "./components/Stat";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseById, setExpenseById] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

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
  };
  const getSetExpenseById = async ({ id }: { id: string }) => {
    const data = await getExpenseById(id);
    setExpenseById(data);
  };

  const putAndUpdate = async (id: string, values: PostValues) => {
    setIsLoading(true);
    await putFetch(id, values);
    setIsLoading(false);
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
    getSetExpenses();
  }, [isLoading]);
  return (
    <div className="App">
      <Container className="d-flex justify-content-center p-0">
        <Col sm={2}>
          <ListCategories
            categories={categories}
            setCurrentCategory={setCurrentCategory}
          />
        </Col>

        <Col sm={7}>
          <Row></Row>
          <Row>
            {" "}
            <GroupButtonFormList
              categories={categories}
              expenses={expenses}
              expenseById={expenseById}
              currentCategory={currentCategory}
              postAndUpdate={postAndUpdate}
              getSetExpenseById={getSetExpenseById}
              setExpenseById={setExpenseById}
              putAndUpdate={putAndUpdate}
              deleteAndUpdate={deleteAndUpdate}
            />
          </Row>
        </Col>

        <Col sm={2}>
          <Stat expenses={expenses} categories={categories} />
        </Col>
      </Container>
    </div>
  );
}

export default App;
