import { Button, ButtonGroup } from "react-bootstrap";
import { Expense, InputEnum } from "../types";

interface Props {
  setChoiceInput: (actionName: string) => void;
  setExpenseById: (expense : Expense | null) => void
}

const ButtonGroupComponent: React.FC<Props> = ({ setChoiceInput,setExpenseById }) => {
  const handleButton = (actionName: string) => {
    return () => {
      if (!(actionName === InputEnum.search)) setChoiceInput(actionName);
      else setExpenseById(null);
    };
  };

  return (
    <ButtonGroup>
      <Button variant="success" onClick={handleButton(InputEnum.add)}>
        Add
      </Button>
      <Button variant="warning" onClick={handleButton(InputEnum.edit)}>
        Edit
      </Button>
      <Button variant="danger" onClick={handleButton(InputEnum.delete)}>
        Del
      </Button>
      <Button variant="secondary" onClick={handleButton(InputEnum.search)}>
        Esc
      </Button>
    </ButtonGroup>
  );
};

export default ButtonGroupComponent;
