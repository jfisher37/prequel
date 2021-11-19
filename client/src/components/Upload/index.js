import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import ADD_VIDEO from "../../utils/mutations";
import Button from "react-bootstrap/Button";
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
    <div>
      <div>
        <button
          id="upload_widget"
          onClick={uploadClick}
          className="cloudinary-button"
        >
          Upload
        </button>
        <Form>
          <Col sm={5}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
            </Form.Group>
          </Col>
          <Button variant="primary" type="submit" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      <p>
        You need to be logged in to upload a video. Please{" "}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
    </div>
  );
}

export default CloudinaryUploadWidget;