import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return { email: action.email, password: state.password };
    case "setPassword":
      return { email: state.email, password: action.password };
    default:
      return { email: state.email, password: state.password };
  }
}

function LoginPage() {
  const [formState, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
  });
  console.log(formState);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit");
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={formState.email}
            onChange={(e) => {
              // setEmail(e.target.value)
              dispatch({
                type: "setEmail",
                email: e.target.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={formState.password}
            onChange={(e) => {
              // setPassword(e.target.value)
              dispatch({
                type: "setPassword",
                password: e.target.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="dark" className="mt-3">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New customer? <Link to="/register">Sign Up</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}
export default LoginPage;
