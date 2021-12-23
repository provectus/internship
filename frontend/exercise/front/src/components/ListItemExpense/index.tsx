import { Badge, ListGroup, Button } from "react-bootstrap";
import { Expense, Category, PostValues } from "../../types";

import pencil from "bootstrap-icons/icons/pencil.svg";
import trash from "bootstrap-icons/icons/trash.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import MenuExpense from "../MenuExpense";
import React from "react";
import { useToggle } from "../../hooks/useToggle";
interface Props {
  expenseById: Expense | undefined;
  categories: Category[];

  putAndUpdate: (id: string, values: PostValues) => void;
  deleteAndUpdate: (idForEdit: string) => void;
}

type visibility = "visible" | "hidden";
interface Style {
  visibility: visibility;
}

const ListItemExpense: React.FC<Props> = React.memo(
  ({ expenseById, categories, putAndUpdate, deleteAndUpdate }) => {
    const [showMenuExpense, setShowMenuExpense] = useToggle(false);
    const [showInput, setShowInput] = useToggle(false);

    const categoryToString = () => {
      if (!expenseById) return null;
      for (let category of categories) {
        if (category._id === expenseById.category) {
          return category.title;
        }
      }
    };
    const visibilityStyle = (): Style => {
      return { visibility: showMenuExpense ? "visible" : "hidden" };
    };
    const showButtonHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
      return setShowInput();
    };
    const deleteButtonHandle =
      (id: string) => (e: React.SyntheticEvent<HTMLButtonElement>) =>
        deleteAndUpdate(id);

    return (
      <>
        {expenseById && !expenseById.error ? (
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              onMouseOver={showInput ? undefined : setShowMenuExpense}
              onMouseOut={showInput ? undefined : setShowMenuExpense}
            >
              <div className="ps-4">
                <div className="fw-bold mb-2 d-flex align-self-start">
                  {expenseById.description}
                </div>
                <div className="text-secondary">{categoryToString()}</div>
              </div>
              <div className="d-flex align-self-center">
                {showInput && (
                  <MenuExpense
                    idForEdit={expenseById._id}
                    putAndUpdate={putAndUpdate}
                    expenseById={expenseById}
                  />
                )}
              </div>
              <div className="d-flex">
                <div className="pe-2">
                  <h3>
                    <Badge bg="warning" pill>
                      {expenseById.amount}
                    </Badge>
                  </h3>
                  <span>{expenseById.date.split("T")[0]}</span>
                </div>

                <div
                  className="d-flex flex-column justify-content-around"
                  style={visibilityStyle()}
                >
                  <Button
                    className="p-1"
                    style={{ border: "none" }}
                    variant="outline-light"
                    onClick={deleteButtonHandle(expenseById._id)}
                  >
                    <img src={trash} alt="trash" />
                  </Button>{" "}
                  <Button
                    className="p-1"
                    style={{ border: "none" }}
                    variant="outline-light"
                    onClick={showButtonHandler}
                  >
                    <img src={pencil} alt="close" />
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ) : (
          "Нет данных"
        )}
      </>
    );
  }
);
export default ListItemExpense;
