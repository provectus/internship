import './Category.css';
import React, { useState } from 'react';
import { Plus, Minus } from 'react-feather';
import Expense from '../Expense/Expense';

function Category(props) {
  const { id, title, amount, content, ...rest } = props
  const [isActive, setIsActive] = useState(false);


  return (
    <li {...rest}>
      <button className="category" onClick={() => { setIsActive(!isActive) }}>
        <h2>{title}</h2>
        <p>{amount.toLocaleString()} ₽</p>
        <i>
          {isActive ?
            <Minus size={40} color="#31AB06" /> :
            <Plus size={40} color="#31AB06" />
          }
        </i>
      </button>
      {isActive && <ul className="expenses">
        {content.length ? content.map((expense) => (
          <Expense key={expense._id} id={expense._id} description={expense.description} amount={expense.amount} date={expense.date} />
        ))
          : <li>No expenses in this category</li>
        }
      </ul>}
    </li>
  );
}

export default Category;