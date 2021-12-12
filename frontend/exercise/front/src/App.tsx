import React, { useEffect, useState } from "react";
import { Col, Container, Row, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCategories, getExpenseById, getExpenses, postFetch } from "./api";
import "./App.css";
import ListCategories from "./components/ListCategories";
import TableComponnet from "./components/TableComponent";
import { Category, Expense, PostValues } from "./components/types";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseById, setExpenseById] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>(
    "617be036888f752511901458"
  ); //default category is Housing

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
    <div className="App">
      <Container>
        <Row>
          <Col sm={3}>
            <ListCategories
              categories={categories}
              setCurrentCategory={setCurrentCategory}
            />
          </Col>
          <Col sm={8}>
            <Row>
              <h2>
                <Badge bg="secondary">Сумма расходов</Badge>
              </h2>
            </Row>
            <Row>
              {" "}
              <TableComponnet
                categories={categories}
                expenses={expenses}
                expenseById={expenseById}
                currentCategory={currentCategory}
                postAndUpdate={postAndUpdate}
                getSetExpenseById={getSetExpenseById}
                setExpenseById={setExpenseById}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
