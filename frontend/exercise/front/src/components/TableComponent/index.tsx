import React, { useState } from "react";
import SearchFormComponent from "../FormSearch";
import { Category, Expense, InputEnum, PostValues, typeSearch } from "../types";
import { Container, Row } from "react-bootstrap";
import ButtonGroupComponent from "../ButtonGroupComponent";
import AddFormComponent from "../FormAdd";
import SingleList from "../ListSingle";
import Plate from "../Plate";
import ListComponent from "../ListComponent";
import FormEdit from "../FormEdit";
import FormDelete from "../FormDelete";

interface Props {
  categories: Category[];
  expenses: Expense[];
  expenseById: Expense | null;
  currentCategory: string;
  postAndUpdate: (data: PostValues) => void;
  getSetExpenseById: (values: typeSearch) => void;
  setExpenseById: (expense: Expense | null) => void;
  putAndUpdate: (id: string, values: PostValues) => void;
  deleteAndUpdate: (id: string) => void;
}

const TableComponnet: React.FC<Props> = ({
  categories,
  expenses,
  expenseById,
  currentCategory,
  postAndUpdate,
  getSetExpenseById,
  setExpenseById,
  putAndUpdate,
  deleteAndUpdate,
}) => {
  const [choiceInput, setChoiceInput] = useState<string>(InputEnum.search);
  const [idForEdit, setIdForEdit] = useState<string>("");

  const returnForm = () => {
    if (choiceInput === InputEnum.add)
      return (
        <AddFormComponent
          categories={categories}
          postAndUpdate={postAndUpdate}
        />
      );
    if (choiceInput === InputEnum.edit)
      return <FormEdit putAndUpdate={putAndUpdate} idForEdit={idForEdit} />;
    if (choiceInput === InputEnum.delete)
      return (
        <FormDelete deleteAndUpdate={deleteAndUpdate} idForEdit={idForEdit} />
      );
    if (choiceInput === InputEnum.search)
      return <SearchFormComponent getSetExpenseById={getSetExpenseById} />;
  };

  return (
    <div>
      <Container fluid="md">
        <Row>{returnForm()}</Row>
        <Row>
          <ButtonGroupComponent
            setChoiceInput={setChoiceInput}
            setExpenseById={setExpenseById}
          />
        </Row>
        <Row>
          <Plate expense={expenses[0]} />
        </Row>

        {expenseById ? (
          <Row>
            <SingleList expenseById={expenseById} categories={categories} />
          </Row>
        ) : (
          <Row>
            <ListComponent
              setIdForEdit={setIdForEdit}
              expenses={expenses}
              currentCategory={currentCategory}
              categories={categories}
            />
          </Row>
        )}
      </Container>
    </div>
  );
};
export default TableComponnet;
