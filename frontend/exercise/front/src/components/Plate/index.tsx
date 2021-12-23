import { ListGroup } from "react-bootstrap";
import { Expense } from "../../types";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  expense: Expense;
}

const Plate: React.FC<Props> = ({ expense }) => {
  const returnHeaderList = () => {
    if (expense) {
      const filterArray = ["_id", "__v", "updatedAt", "createdAt"];
      const plate = Object.keys(expense)
        .filter((key) => {
          for (let filter of filterArray) {
            if (key === filter) return false;
          }
          return true;
        })
        .map((key) => <span>{key}</span>);
      return (
        <ListGroup.Item style={{width: "100%"}} className="d-flex justify-content-between align-self-center">
          {plate}
        </ListGroup.Item>
      );
    }
  };

  return <ListGroup horizontal>{returnHeaderList()}</ListGroup>;
};

export default Plate;
