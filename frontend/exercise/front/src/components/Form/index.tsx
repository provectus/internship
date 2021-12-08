import React from "react";
import { Row, Col, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { typeCategories } from "../Table";

interface typeFormComponentProps {
  categories: typeCategories[];
}

const FormComponent: React.FC<typeFormComponentProps> = (categories) => {
  console.log(categories);
  return (
    <Row className="g-2">
      <Col sm>
        <FloatingLabel controlId="floatingInputGrid" label="amount of costs">
          <Form.Control type="price" placeholder="5000" />
        </FloatingLabel>
      </Col>
      <Col sm>
        <FloatingLabel controlId="floatingInputGrid" label="Date">
          <Form.Control type="date" placeholder="example: 20.03.2012" />
        </FloatingLabel>
      </Col>
      <Col sm>
        <FloatingLabel controlId="floatingInputGrid" label="Shop">
          <Form.Control type="shop" placeholder="shop name" />
        </FloatingLabel>
      </Col>
      <Col sm>
        <FloatingLabel
          controlId="floatingSelectGrid"
          label="Works with selects"
        >
          <Form.Select size="sm" aria-label="Floating label select example">
            <option>Open this select menu</option>
            {/* {categories.map((category: typeCategories) => (
              <option value={category._id}>{category.title}</option>
            ))} */}
          </Form.Select>
        </FloatingLabel>
      </Col>
    </Row>
  );
};

export default FormComponent;
