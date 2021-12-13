import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { separeteByCategories } from "../../utils";
import { Expense } from "../types";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface Props {
  expensesOfMonth: Expense[] | null
}

const StatChart: React.FC<Props> = ({expensesOfMonth}) => {
  return (
    <PieChart width={300} height={250} onMouseEnter={() => {}}>
      <Pie
        data={data}
        cx={90}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {expensesOfMonth && separeteByCategories(expensesOfMonth)!.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
export default StatChart;
