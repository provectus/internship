import React from "react";
import * as formik from "formik";
import { Row, Col, FloatingLabel, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Categories, PostValues } from "../types";

const styleForm = {
  border: "1px solid grey",
  borderRadius: "5px",
};

interface Props {
  categories: Categories[];
  postAndUpdate: (values: PostValues) => void;
}

const { Formik } = formik;

const schema = yup.object().shape({
  price: yup.number().required(),
  date: yup.date().required(),
  shop: yup.string().required(),
  category: yup.string().required(),
});

const AddFormComponent: React.FC<Props> = (props) => {
  // const handleSubmit = (event: any) => {
  //   const form = event.currentTarget;

  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        // console.log(values);
        return props.postAndUpdate(values);
      }}
      initialValues={{
        price: undefined,
        date: "",
        shop: "",
        category: "617be036888f752511901458",
        floatingSelectGrid: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate style={styleForm} onSubmit={handleSubmit}>
          <Row className="g-1">
            <Col sm={3}>
              <Form.Group controlId="validationFormik01">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="amount of costs(example: 500)"
                >
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
            <Col xs="auto">
              <Form.Group controlId="validationFormik02">
                <FloatingLabel controlId="floatingInputGrid" label="Date">
                  <Form.Control
                    size="sm"
                    type="datetime-local"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    isValid={touched.date && !errors.date}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group controlId="validationFormik02">
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
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Choose categories"
              >
                <Form.Select
                  size="sm"
                  aria-label="Floating label select example"
                  // value={values.category}
                  onChange={handleChange}
                  isValid={touched.category && !errors.category}
                >
                  {props.categories.map((category: Categories) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
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
  );
};

export default AddFormComponent;
