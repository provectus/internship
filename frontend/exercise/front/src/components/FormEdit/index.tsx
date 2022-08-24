import React from "react";
import * as formik from "formik";
import { Row, Col, FloatingLabel, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostValues } from "../../types";

const styleForm = {
  border: "1px solid grey",
  borderRadius: "5px",
};

interface Props {
  idForEdit: string;
  putAndUpdate: (id: string, values: PostValues) => void;
}

const { Formik } = formik;

const schema = yup.object().shape({
  price: yup.number().required(),
  date: yup.date().required(),
  shop: yup.string().required(),
});

const FormEdit: React.FC<Props> = ({ idForEdit, putAndUpdate }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        return putAndUpdate(idForEdit, values);
      }}
      initialValues={{
        price: undefined,
        date: "",
        shop: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          className="p-0"
          style={styleForm}
          onSubmit={handleSubmit}
        >
          <Row className="g-1" style={{ alignItems: "center" }}>
            <Col sm="3">
              <fieldset disabled>
              <Form.Group>
                <FloatingLabel controlId="floatingInputGrid" label="id">
                  <Form.Control
                   style={{fontSize:".8rem"}}
                   size="sm"
                   type="text"
                   name="id"
                      value={idForEdit}
                      readOnly
                  />
                </FloatingLabel>
              </Form.Group>
              </fieldset>
            </Col>
            <Col sm="2">
              <Form.Group controlId="validationFormik02">
                <FloatingLabel controlId="floatingInputGrid" label="Cost">
                  <Form.Control
                    size="sm"
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="validationFormik03">
                <FloatingLabel controlId="floatingInputGrid" label="Date">
                  <Form.Control
                    size="sm"
                    style={{ fontSize: ".8rem" }}
                    type="datetime-local"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    isValid={touched.date && !errors.date}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col sm="2">
              <Form.Group controlId="validationFormik04">
                <FloatingLabel controlId="floatingInputGrid" label="Shop">
                  <Form.Control
                    size="sm"
                    type="text"
                    name="shop"
                    value={values.shop}
                    onChange={handleChange}
                    isValid={touched.shop && !errors.shop}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button size="lg" variant="primary" type="submit">
                Edit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormEdit;
