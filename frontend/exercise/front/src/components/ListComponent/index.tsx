import { Badge, ListGroup } from "react-bootstrap";
import { Category, Expense } from "../../types";

interface Props {
  expenses: Expense[];
  currentCategory: string;
  categories: Category[];
  setIdForEdit: (id: string) => void;
}

const ListComponent: React.FC<Props> = ({expenses, currentCategory, categories, setIdForEdit}) => {
  const categoryToString = (expense: Expense) => {
    for (let category of categories) {
      if (category._id === expense.category) {
        return category.title
      } 
    }
  }
  const handleDoubleClick = (id:string) => ()=>setIdForEdit(id)
  return (
    <ListGroup as="ol">
      {expenses
        ? expenses
            .filter(
              (expenseCategory: Expense) =>
                expenseCategory.category === currentCategory
            )
            // .slice(-3)

            .map((expense: Expense) => (
              <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              onDoubleClick={handleDoubleClick(expense._id)}
                key={expense.date + Math.random().toString}
              >
          <div>
            <div className="fw-bold mb-2 d-flex align-self-start">{expense.description}</div>
            <div className="text-secondary">{categoryToString(expense)}</div>
          </div>
          <div>
            <h3>
              <Badge bg="warning" pill>
                {expense.amount}
              </Badge>
            </h3>
            <span>{expense.date.split("T")[0]}</span>
                </div>
                </ListGroup.Item>
            ))
        :         <ListGroup.Item
          as="li">Нет данных</ListGroup.Item>}
     </ListGroup>
  )
}
export default ListComponent;