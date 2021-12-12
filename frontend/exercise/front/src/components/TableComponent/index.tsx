import React, { useState } from "react";
import SearchFormComponent from "../SearchForm";
import { Category, Expense, InputEnum, PostValues, typeSearch } from "../types";
import { Container, Row, Table } from "react-bootstrap";
import ButtonGroupComponent from "../ButtonGroupComponent";
import AddFormComponent from "../AddForm";
import SingleList from "../ListSingle";
import Plate from "../Plate";
import ListComponent from "../ListComponent";

const styleTable = {
  border: "1px solid black",
  margin: "2px",
};

interface Props {
  categories: Category[];
  expenses: Expense[];
  expenseById: Expense | null;
  currentCategory: string;
  postAndUpdate: (data: PostValues) => void;
  getSetExpenseById: (values: typeSearch) => void;
  setExpenseById: (expense: Expense | null) => void
}

const TableComponnet: React.FC<Props> = ({
  categories,
  expenses,
  expenseById,
  currentCategory,
  postAndUpdate,
  getSetExpenseById,
  setExpenseById,
}) => {
  const [isToched, setIsTouched] = useState<boolean>(false);
  const [choiceInput, setChoiceInput] = useState<string>(InputEnum.search);

  const returnForm = () => {
    if (choiceInput === InputEnum.add)
      return (
        <AddFormComponent
          categories={categories}
          postAndUpdate={postAndUpdate}
        />
      );
    // if (choiceInput === InputEnum.edit) return <EditFormComponent />;
    // if (choiceInput === InputEnum.delete) return <DeleteFormComponent />;
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
              <SingleList expenseById={expenseById} />
            </Row>
          ) : (
              <Row>
              <ListComponent expenses={expenses} currentCategory={currentCategory}/>
              </Row>
          )}

      </Container>
    </div>
  );
};
export default TableComponnet;
