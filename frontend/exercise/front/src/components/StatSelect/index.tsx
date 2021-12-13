import React from "react";
import { Form } from "react-bootstrap";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  setSelectedMonth: (value: number) => void;
}

const StatSelect: React.FC<Props> = ({ setSelectedMonth }) => {
  const handleChange = ({ target: { value } }: { target: HTMLSelectElement }) => {
    console.log(value);
    setSelectedMonth(Number(value));
  }
  return (
    <Form.Select size="sm" onChange={handleChange}>
      {months.map((month: string, index: number) => (
        <option value={index}>{month}</option>
      ))}
    </Form.Select>
  );
};
export default StatSelect;
