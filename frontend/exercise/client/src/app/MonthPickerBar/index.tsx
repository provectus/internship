import { Col, Form, Navbar, Row } from 'react-bootstrap';

interface Props {
  range: Array<string>;
  onChange: any;
}

export const MonthPickerBar = (props: Props) => {
  const selectRange = props.range.map((monthYear) => {
    return (
      <option key={monthYear} value={monthYear}>
        {monthYear}
      </option>
    );
  });
  return (
    <Navbar sticky='top' className='justify-content-center bg-white'>
      <Row>
        <Col xs='auto' className='text-center'>
          <Form.Select size='lg' onChange={props.onChange}>
            {selectRange}
          </Form.Select>
        </Col>
      </Row>
    </Navbar>
  );
};
