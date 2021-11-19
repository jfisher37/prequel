import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import ADD_VIDEO from "../../utils/mutations";
import Auth from "../../utils/auth";

function CloudinaryUploadWidget() {
  const [title, setTitle] = useState("");
  const [URL, setURL] = useState("");
  const [author, setAuthor] = useState("");
  const [addVideo, { error }] = useMutation(ADD_VIDEO);

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dq3jfvis9",
      uploadPreset: "cyajgdzc",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the video info: ", result.info);
        setURL(result.info.secure_url);
      }
    }
  );

  const uploadClick = () => {
    myWidget.open();
  };
  console.log(Auth.getProfile().data.name)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      addVideo({
        variables: {
          title: title,
          cloudURL: URL,
          videoAuthor: Auth.getProfile().data.name,
        },
      });
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container className="upload-container justify-content-md-center">
      <Row className="justify-content-md-center upload-padding-top">
        <Form.Label>Upload Your Video</Form.Label>
      </Row>
      <Row className="justify-content-md-center">
        <button
          id="upload_widget"
          onClick={uploadClick}
          className="cloudinary-button button6"
        >
          Upload
        </button>
      </Row>
      <Form>
        <Row className="justify-content-md-center">
          <Col sm={5}>
            <Form.Group as={Col} className="upload-label" controlId="formGridEmail">
              <Form.Label  >Video Title</Form.Label>
              <Form.Control
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <button className='button6' type="submit" onClick={handleFormSubmit}>
            Submit
          </button>
        </Row>

      </Form>

    </Container>
  );
}

export default CloudinaryUploadWidget;