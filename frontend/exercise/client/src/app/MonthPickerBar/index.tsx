import { useState } from 'react';
import { Col, Form, Navbar, Row } from 'react-bootstrap';

interface Props {
  range: Array<string>;
  onChange: any;
  currentMonthYear: string;
}

export const MonthPickerBar = (props: Props) => {
  const [currentMonthYear, setCurrentMonthYear] = useState(
    props.currentMonthYear
  );

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
          <Form.Select
            value={currentMonthYear}
            size='lg'
            onChange={(e: any) => {
              setCurrentMonthYear(e.target.value);
              props.onChange(e);
            }}
          >
            {selectRange}
          </Form.Select>
        </Col>
      </Row>
    </Navbar>
  );
};
