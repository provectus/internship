import React from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

interface typeSearch {
  id: string
}

const styleForm = {
  border: "1px solid grey",
  borderRadius: "5px",
};
interface Props {
  getExpenseById: (values:typeSearch)=>void
}

const { Formik } = formik;

const schema = yup.object().shape({
  id: yup.string().required()
    // .test('len', 'Must be exactly 5 characters', val => {
    // if (val) {
    //   return val.length === 5
    // }),
});

const SearchFormComponent: React.FC<Props> = ({getExpenseById}) => {
  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values: typeSearch) => {
          // console.log(values);
          getExpenseById(values)

        }}
        initialValues={{
          id: "617be036888f7525119014c9",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate style={styleForm} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="validationFormik01">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Search by id"
                  >
                    <Form.Control
                      size="sm"
                      type="text"
                      name="id"
                      value={values.id}
                      onChange={handleChange}
                      // onKeyPress={handleSubmit}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button size="lg" variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchFormComponent;

