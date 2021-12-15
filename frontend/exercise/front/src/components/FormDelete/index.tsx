import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";


const styleForm = {
  border: "1px solid grey",
  borderRadius: "5px",
  paddingRight: "5px"
};
interface Props {
  idForEdit: string;
  deleteAndUpdate: (id: string) => void;
}

const FormDelete: React.FC<Props> = ({ idForEdit, deleteAndUpdate }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    deleteAndUpdate(idForEdit)
  }
  return (
    <div>
          <Form noValidate style={styleForm}  onSubmit={handleSubmit}>
            <Row style={{  alignItems: "center"}}>
              <Col>
                <fieldset disabled>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Delete by id"
                  >
                    <Form.Control
                      size="sm"
                      type="text"
                      name="id"
                      value={idForEdit}
                    />
                  </FloatingLabel>
                </Form.Group>
                </fieldset>
              </Col>
              <Col xs="auto">
                <Button size="lg" variant="primary" type="submit">
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
    </div>
  );
};

export default FormDelete;

