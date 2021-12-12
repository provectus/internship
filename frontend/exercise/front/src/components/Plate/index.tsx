import { ListGroup } from "react-bootstrap";
import { Expense } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  expense: Expense;
}

const Plate: React.FC<Props> = ({ expense }) => {
  const returnHeaderList = () => {
    if(expense){
    const filterArray = ["_id", "__v", "updatedAt", "createdAt"];
    return Object.keys(expense)
      .filter((key) => {
        for (let filter of filterArray) {
          if (key === filter) return false;
        }
        return true;
      })
      .map((key) => (
        <ListGroup.Item key={key + Math.random().toString}>
          {key}
        </ListGroup.Item>
      ));
    }
  };

  return (
      <ListGroup
        className="d-flex justify-content-between align-items-start"
        horizontal
      >
        {returnHeaderList()}
      </ListGroup>

  );
};

export default Plate;
