import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
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
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container className="loginForm">
      <Row className="justify-content-md-center ">
        {data ? (
          <p>
            Success! You may now head{" "}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <Row>Login</Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" value={formState.email}
                  onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={formState.password}
                  onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Row>
          </Form>
        )}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </Row>
    </Container>

  );
};

export default Login;
