import { useEffect, useState } from "react";
import { Badge, Container, Row } from "react-bootstrap";
import { expensesBySelectedMonth, sumByMonth } from "../../utils";
import StatChart from "../StatChart";
import StatSelect from "../StatSelect";
import { Category, Expense } from "../../types";

interface Props {
  expenses: Expense[];
  categories: Category[];
}

const Stat: React.FC<Props> = ({ expenses, categories }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [expensesOfMonth, setExpensesOfMonth] = useState<Expense[] | null>(
    null
  );

  useEffect(
    () => setExpensesOfMonth(expensesBySelectedMonth(expenses, selectedMonth)),
    [selectedMonth, expenses]
  );
  return (
    <>
      <Container>
        <Row>
          <h2 className="p-0">
            <Badge bg="secondary">Costs</Badge>
          </h2>
        </Row>
        <Row className="d-flex justify-content-center text-muted">
          in just a month{" "}
        </Row>
        <Row>
          <h4>
            <Badge bg="secondary">{` ${sumByMonth(expensesOfMonth)}$`}</Badge>
          </h4>
        </Row>
        <Row className="d-flex justify-content-center">
          <StatChart
            expensesOfMonth={expensesOfMonth}
            categories={categories}
          />
        </Row>
        <Row className="d-flex justify-content-center">
          <StatSelect setSelectedMonth={setSelectedMonth} />
        </Row>
      </Container>
    </>
  );
};

export default Stat;
