import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { separateByCategories } from "../../utils";
import { Category, Expense } from "../../types";

const COLORS = [
  "#0d6efd",
  "#6610f2",
  "#6f42c1",
  "#d63384",
  "#dc3545",
  "#fd7e14",
  "#ffc107",
  "#198754",
  "#20c997",
  "#0dcaf0",
];

interface Props {
  expensesOfMonth: Expense[] | null;
  categories: Category[];
}

const StatChart: React.FC<Props> = ({ expensesOfMonth, categories }) => {
  const data = separateByCategories(expensesOfMonth, categories);

  return (
    <PieChart width={300} height={250} onMouseEnter={() => {}}>
      <Pie
        data={data}
        cx={130}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data &&
          data.map((entry, index) => (
            <Cell
            className="d-flex justify-content-center align-items-start"
              key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};
export default StatChart;
