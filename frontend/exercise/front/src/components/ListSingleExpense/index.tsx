import { Badge, ListGroup } from "react-bootstrap";
import { Expense, Category } from "../../types";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  expenseById: Expense;
  categories: Category[];
}

const ListSingleExpense: React.FC<Props> = ({
  expenseById,
  categories,
}) => {
  const categoryToString = () => {
    for (let category of categories) {
      if (category._id === expenseById.category) {
        return category.title;
      } else return expenseById.category;
    }
  };
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div>
          <div className="fw-bold mb-2 d-flex align-self-start">
            {expenseById.description}
          </div>
          <div className="text-secondary">{categoryToString()}</div>
        </div>
        <div>
          <h3>
            <Badge bg="warning" pill>
              {expenseById.amount}
            </Badge>
          </h3>
          <span>{expenseById.date.split("T")[0]}</span>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ListSingleExpense;
