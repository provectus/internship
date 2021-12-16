import { Modal, ModalBody } from 'react-bootstrap';
import { AddExpenseForm } from '../../components/AddExpenseForm';
import { DeleteExpenseModal } from '../../components/DeleteExpenseModal';
import { EditExpenseForm } from '../../components/EditExpenseForm';
import { Category, Expense } from '../../types';

interface Props {
  type: string | null;
  expense: Expense | null;
  expenseCategoryTitle: string | null;
  categories: Category[];
  onHide: any;
  onSubmit: any;
  onDelete: any;
  show: boolean;
}

export const PageModal = (props: Props) => {
  if (props.type === null) {
    return <></>;
  }

  if (props.type === 'delete-expense') {
    return (
      <DeleteExpenseModal
        show={props.show}
        expense={props.expense as Expense}
        onCancel={props.onHide}
        onDelete={props.onDelete}
      ></DeleteExpenseModal>
    );
  }

  return (
    <Modal show={props.show} onHide={props.onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.type === 'add-expense' ? 'Add Expense' : 'Edit Expense'}
        </Modal.Title>
      </Modal.Header>
      <ModalBody>
        {props.type === 'add-expense' ? (
          <AddExpenseForm
            categories={props.categories}
            onSubmit={props.onSubmit}
          />
        ) : (
          <EditExpenseForm
            expenseCategoryTitle={props.expenseCategoryTitle as string}
            expense={props.expense as Expense}
            onSubmit={props.onSubmit}
          />
        )}
      </ModalBody>
    </Modal>
  );
};
