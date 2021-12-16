import { Button, Modal } from 'react-bootstrap';
import { api } from '../../api';
import { Expense } from '../../types';

interface Props {
  onCancel: any;
  onDelete: any;
  expense: Expense;
  show: boolean;
}

export const DeleteExpenseModal = (props: Props) => {
  const handleDelete = async () => {
    await api.deleteExpense(props.expense._id);
    await props.onDelete();
  };

  return (
    <Modal show={props.show} centered size='sm'>
      <Modal.Header className='justify-content-center'>
        <Modal.Title>Delete Expense?</Modal.Title>
      </Modal.Header>
      <Modal.Footer className='justify-content-center'>
        <Button variant='primary' onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
