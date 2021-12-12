import { Badge, ListGroup } from "react-bootstrap";
import { Category, Expense } from "../types";

interface Props {
  expenses: Expense[];
  currentCategory: string;
}

const ListComponent: React.FC<Props> = ({expenses, currentCategory}) => {
  return (
    
    <ListGroup as="ol">
      {expenses
        ? expenses
            .filter(
              (expenseCategory: Expense) =>
                expenseCategory.category === currentCategory
            )
            .slice(-5)

            .map((expense: Expense) => (
              <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
     
                key={expense.date + Math.random().toString}
              >
          <div>
            <div className="fw-bold mb-2">{expense.description}</div>
            <div className="text-secondary">{expense.category}</div>
          </div>
          <div>
            <h3>
              <Badge bg="warning" pill>
                {expense.amount}
              </Badge>
            </h3>
            <span>{expense.date}</span>
                </div>
                </ListGroup.Item>
            ))
        :         <ListGroup.Item
          as="li">Нет данных</ListGroup.Item>}
     </ListGroup>
  )
}
export default ListComponent;