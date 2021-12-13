import React from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { typeSearch } from "../types";


const styleForm = {
  border: "1px solid grey",
  borderRadius: "5px",
  paddingRight: "5px"
};
interface Props {
  getSetExpenseById: (values:typeSearch)=>void
}

const { Formik } = formik;

const schema = yup.object().shape({
  id: yup.string().required()
    // .test('len', 'Must be exactly 5 characters', val => {
    // if (val) {
    //   return val.length === 5
    // }),
});

const SearchFormComponent: React.FC<Props> = ({getSetExpenseById}) => {
  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values: typeSearch) => getSetExpenseById(values)}
        initialValues={{
          id: "617be036888f7525119014c9",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate style={styleForm}  onSubmit={handleSubmit}>
            <Row style={{  alignItems: "center"}}>
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
                  Search
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

