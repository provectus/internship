import { Badge, ListGroup } from "react-bootstrap";
import { Expense } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  expenseById: Expense;
}

const SingleList: React.FC<Props> = ({ expenseById }) => {

  return (
      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <div className="fw-bold mb-2">{expenseById.description}</div>
            <div className="text-secondary">{expenseById.category}</div>
          </div>
          <div>
            <h3>
              <Badge bg="warning" pill>
                {expenseById.amount}
              </Badge>
            </h3>
            <span>{expenseById.date}</span>
          </div>
        </ListGroup.Item>
      </ListGroup>
  );
};

export default SingleList;