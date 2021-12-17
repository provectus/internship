import './Expense.css';
import { X, Edit2 } from 'react-feather';
import { Link } from 'react-router-dom';

interface ExpenseItemProps {
  id: string,
  description: string,
  amount: number,
  date: string,
  onDeleteClick: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined,
}

function Expense(props: ExpenseItemProps) {
  const { id, description, amount, date, onDeleteClick, ...rest } = props

  return (
    <li key={id} className="expense" {...rest}>
      <div>
        <h2>{description}</h2>
        {new Date(date).toLocaleString()}
      </div>
      <p>{amount.toLocaleString()} ₽</p>
      {onDeleteClick && <button type="button" onClick={onDeleteClick} >
        <i>
          <X size={24} color="#31AB06" />
        </i>
      </button>}
      <button type="button" >
        <Link to={`/edit-expense/${id}`}>
          <i>
            <Edit2 size={24} color="#31AB06" />
          </i>
        </Link>
      </button>
    </li>
  );
}

export default Expense;