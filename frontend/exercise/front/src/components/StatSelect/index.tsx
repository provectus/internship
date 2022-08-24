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
  const handleChange = ({
    target: { value },
  }: {
    target: HTMLSelectElement;
  }) => {
    setSelectedMonth(Number(value));
  };

  return (
    <Form.Select size="sm" style={{ width: "15vw" }} onChange={handleChange}>
      {months.map((month: string, index: number) => (
        <option key={month + index} value={index}>
          {month}
        </option>
      ))}
    </Form.Select>
  );
};
export default StatSelect;
