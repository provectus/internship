import { Category, Expense, PostValues } from "../../types";
import ListItemExpense from "../ListItemExpense";

interface Props {
  expenses: Expense[];
  categories: Category[];
  putAndUpdate: (id: string, values: PostValues) => void;
  deleteAndUpdate: (idForEdit: string) => void;
}

const ListExpenses: React.FC<Props> = ({
  expenses,
  categories,
  putAndUpdate,
  deleteAndUpdate,
}) => {
  return (
    <>
      {expenses
        ? expenses.map((expense: Expense) => (
            <ListItemExpense
              expenseById={expense}
              categories={categories}
              putAndUpdate={putAndUpdate}
              deleteAndUpdate={deleteAndUpdate}
            />
          ))
        : "Нет данных"}
    </>
  );
};
export default ListExpenses;
