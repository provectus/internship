import React, { useState } from "react";
import SearchForm from "../SearchForm";
import AddForm from "../AddForm";
import plus from "bootstrap-icons/icons/plus.svg";
import {
  Category,
  Expense,
  InputEnum,
  PostValues,
  typeSearch,
} from "../../types";
import { Container, Row, Button, Col } from "react-bootstrap";
import Plate from "../Plate";
import ListExpenses from "../ListExpenses";
import { useToggle } from "../../hooks/useToggle";

interface Props {
  categories: Category[];
  expenses: Expense[];
  postAndUpdate: (data: PostValues) => void;
  putAndUpdate: (id: string, values: PostValues) => void;
  deleteAndUpdate: (id: string) => void;
  setDataFromSearchInput: (data: string) => void;
}

const GroupButtonFormList: React.FC<Props> = ({
  categories,
  expenses,
  postAndUpdate,
  putAndUpdate,
  deleteAndUpdate,
  setDataFromSearchInput
}) => {
  const [isAddForm, setIsAddForm] = useToggle(false);

  const returnForm = () => {
    return (isAddForm ?
      <AddForm setIsAddForm={setIsAddForm} categories={categories}
        postAndUpdate={postAndUpdate} /> :
      <SearchForm setIsAddForm={setIsAddForm } setDataFromSearchInput={setDataFromSearchInput} />)
  }

  return (
    <>
      <Container fluid="md">
        <Row>{returnForm()}</Row>
        <Row>
          <Plate expense={expenses[0]} />
        </Row>
        <Row>
          <ListExpenses
            expenses={expenses}
            categories={categories}
            putAndUpdate={putAndUpdate}
            deleteAndUpdate={deleteAndUpdate}
          />
        </Row>
      </Container>
    </>
  );
};
export default GroupButtonFormList;
