import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // Clear form values on submit
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1 className="login-header">Login</h1>
      <Container className="loginForm">
        <Row className="justify-content-md-center padding-login">
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={4}>Email</Form.Label>
                <Col sm={10}>
                  <Form.Control name="email" type="email" placeholder="Enter email" value={formState.email}
                    onChange={handleChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={4}>Password</Form.Label>
                <Col sm={10}>
                  <Form.Control name="password" type="password" placeholder="Password" value={formState.password}
                    onChange={handleChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <button type="submit" className="button6">Sign in</button>
                </Col>
              </Form.Group>
            </Form>
          )}
          {error && (
            <div className="my-3 p-3 text-white">
              {error.message}
            </div>
          )}
        </Row>
      </Container>
    </div >
  );
};

export default Login;
