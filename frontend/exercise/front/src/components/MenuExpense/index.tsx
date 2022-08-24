import React from "react";
import * as formik from "formik";
import { Row, Col, Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Expense, PostValues } from "../../types";

interface Props {
  idForEdit: string;
  putAndUpdate: (id: string, values: PostValues) => void;
  expenseById: Expense;
}

const { Formik } = formik;

const schema = yup.object().shape({
  price: yup.number().required(),
  date: yup.date().required(),
  shop: yup.string().required(),
});

const MenuExpense: React.FC<Props> = ({ idForEdit, putAndUpdate, expenseById }) => {
console.log("time", expenseById.date.slice(0, 16))
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log("onSubmit");
        return putAndUpdate(idForEdit, values);
      }}
      initialValues={{
        price: String(expenseById.amount),
        date: expenseById.date.slice(0,16),
        shop: expenseById.description,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          onKeyDown={({ key }) => {
            console.log("Enter", key)
            if (key === "Enter") return handleSubmit();

          }}
          onSubmit={handleSubmit}
  
        >
          <Container fluid="sm">
            <Row className="g-1" style={{ alignItems: "center" }}>
              <Col>
                <Form.Group controlId="validationFormik01">
                  <Form.Control
                    placeholder="amount"
                    size="sm"
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationFormik02">
                  <Form.Control
                    size="sm"
                    style={{ fontSize: ".8rem" }}
                    type="datetime-local"
                    name="date"
                    value={values.date || expenseById.date.slice(0,16)}
                    onChange={handleChange}
                    isValid={touched.date && !errors.date}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationFormik03">
                  <Form.Control
                    placeholder="shop"
                    size="sm"
                    type="text"
                    name="shop"
                    value={values.shop}
                    onChange={handleChange}
                    isValid={touched.shop && !errors.shop}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default MenuExpense;
