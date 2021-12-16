import { Tab, Nav, Container, Row, Col } from 'react-bootstrap';
import { ExpensesChart } from '../../components/ExpensesChart';
import { ExpensesList } from '../../components/ExpensesList';
import { Category, Expense } from '../../types';
import { AddExpenseButton } from './styled-components';

interface Props {
  expenses: Array<Expense>;
  categories: Array<Category>;
  month: string;
}

export const Tabs = (props: Props) => {
  return (
    <Tab.Container defaultActiveKey='list-view'>
      <Nav variant='tabs' className='fs-4 justify-content-center'>
        <Nav.Item>
          <Nav.Link eventKey='list-view'>List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='chart-view'>Chart</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content className='pb-2 h-100'>
        <Tab.Pane eventKey='list-view' title='List'>
          <Container fluid>
            <Row>
              <Col className='text-center'>
                <AddExpenseButton size='lg' className='w-100 m-3'>
                  Add Expense
                </AddExpenseButton>
              </Col>
            </Row>
            <Row className='justify-content-center'>
              <Col>
                <ExpensesList
                  categories={props.categories}
                  expenses={props.expenses}
                  month={props.month}
                />
              </Col>
            </Row>
          </Container>
        </Tab.Pane>
        <Tab.Pane eventKey='chart-view' title='Chart' className='h-100'>
          <Container fluid className='h-100'>
            <Row className='justify-content-center h-100'>
              <Col>
                <ExpensesChart
                  categories={props.categories}
                  expenses={props.expenses}
                ></ExpensesChart>
              </Col>
            </Row>
          </Container>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};
