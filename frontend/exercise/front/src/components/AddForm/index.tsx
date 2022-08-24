import React from "react";
import * as formik from "formik";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Category, PostValues } from "../../types";
import search from "bootstrap-icons/icons/search.svg";
import plus from "bootstrap-icons/icons/plus.svg";
import { DEFAULT_CATEGORY } from "../../constant";

interface Props {
  categories: Category[];
  postAndUpdate: (values: PostValues) => void;
  setIsAddForm: () => void;
}

const { Formik } = formik;

const schema = yup.object().shape({
  price: yup.number().required(),
  date: yup.date().required(),
  shop: yup.string().required(),
  category: yup.string().required(),
});

const AddForm: React.FC<Props> = ({
  categories,
  postAndUpdate,
  setIsAddForm,
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        postAndUpdate(values);
        setTimeout(() => {
          resetForm();
          setIsAddForm();
        }, 500);
      }}
      initialValues={{
        price: "amount",
        date: "",
        shop: "shop",
        category: DEFAULT_CATEGORY,
        floatingSelectGrid: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          className="p-0"
          onSubmit={handleSubmit}
          style={{
            paddingTop: ".5rem",
            paddingBottom: ".5rem",
          }}
        >
          <Row className="g-1" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <Form.Group controlId="validationFormik01">
                <Form.Control
                  style={{
                    paddingTop: ".5rem",
                    paddingBottom: ".5rem",
                  }}
                  size="sm"
                  type="text"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  isValid={touched.price && !errors.price}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="validationFormik02">
                <Form.Control
                  style={{
                    paddingTop: ".5rem",
                    paddingBottom: ".5rem",
                  }}
                  size="sm"
                  type="datetime-local"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  isValid={touched.date && !errors.date}
                />
              </Form.Group>
            </Col>
            <Col sm="2">
              <Form.Group controlId="validationFormik02">
                <Form.Control
                  style={{
                    paddingTop: ".5rem",
                    paddingBottom: ".5rem",
                  }}
                  size="sm"
                  type="text"
                  name="shop"
                  value={values.shop}
                  onChange={handleChange}
                  isValid={touched.shop && !errors.shop}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Select
                style={{
                  paddingTop: ".5rem",
                  paddingBottom: ".5rem",
                }}
                size="sm"
                aria-label="Floating label select example"
                onChange={handleChange}
                isValid={touched.category && !errors.category}
              >
                {categories.map((category: Category) => (
                  <option
                    key={category.title + category._id}
                    value={category._id}
                  >
                    {category.title}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Button variant="success" type="submit">
                <img src={plus} alt="plus-expense" />
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => setIsAddForm()}>
                <img src={search} alt="plus_expense" />
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;
