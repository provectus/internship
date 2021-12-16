import { Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import { Category } from '../../types';

interface Props {
  expenseCategory: Category;
  children?: any;
}

const StyledAccordionItem = styled(Accordion.Item)`
  hr:last-child {
    display: none;
  }
`;

export const ExpenseCategoryAccordionItem = (props: Props) => {
  return (
    <StyledAccordionItem eventKey={props.expenseCategory._id}>
      <Accordion.Header>
        <h5>{props.expenseCategory.title}</h5>
      </Accordion.Header>
      <Accordion.Body>{props.children}</Accordion.Body>
    </StyledAccordionItem>
  );
};
