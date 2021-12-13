import { useEffect, useState } from "react";
import { Badge, Row } from "react-bootstrap";
import { expensesBySelectedMonth, separeteByCategories, sumByMonth } from "../../utils";
import StatChart from "../StatChart";
import StatSelect from "../StatSelect";
import { Expense } from "../types";

interface Props {
  expenses: Expense[]
}

const Stat: React.FC<Props> = ({expenses}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(0)
  const [expensesOfMonth, setExpensesOfMonth] = useState<Expense[] | null>(null)
  
  useEffect(() => setExpensesOfMonth(expensesBySelectedMonth(expenses, selectedMonth)),
  [selectedMonth])
console.log("month",expensesOfMonth)
  console.log("categories",separeteByCategories(expensesOfMonth))
  return (
    <>
      <Row>
        <h2 className="p-0">
          <Badge bg="secondary">Costs</Badge>
        </h2>
      </Row>
      <Row className="d-flex justify-content-center text-muted">in just a month </Row>
      <Row>
        <h4>
          <Badge bg="secondary">{
           ` ${sumByMonth(expensesOfMonth)}$`
          }</Badge>
        </h4>
      </Row>
      <Row>
        <StatChart expensesOfMonth={ expensesOfMonth}/>
      </Row>
      <Row>
        <StatSelect setSelectedMonth={ setSelectedMonth}/>
      </Row>
    </>
  );
};

export default Stat;
