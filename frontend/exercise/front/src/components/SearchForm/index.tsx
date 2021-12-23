import React from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import search from "bootstrap-icons/icons/search.svg";
import plus from "bootstrap-icons/icons/plus.svg";

interface Props {
  setIsAddForm: () => void;
  setDataFromSearchInput: (data: string) => void;
}

const { Formik } = formik;

const schema = yup.object().shape({
  data: yup.string().required(),
});

const SearchForm: React.FC<Props> = ({ setIsAddForm, setDataFromSearchInput }) => {
  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={({ data }: {data: string}) => {
          if(!data)return undefined
          setDataFromSearchInput(data)
        }}
        initialValues={{
          data: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form
            noValidate
            onSubmit={ handleSubmit }
          >
            <Row style={{ alignItems: "center" }}>
              <Col>
                <Form.Group controlId="validationFormik01">
                  <Form.Control
                    style={{
                      paddingTop: ".5rem",
                      paddingBottom: ".5rem",
                    }}
                    size="sm"
                    type="text"
                    name="data"
                    value={values.data}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="submit">
                  <img src={search} alt="search" />
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="success" onClick={() => setIsAddForm()}>
                  <img src={plus} alt="plus-expense" />
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
