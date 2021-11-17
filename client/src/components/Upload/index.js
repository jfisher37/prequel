import React from "react";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CloudinaryUploadWidget() {
    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dq3jfvis9",
            uploadPreset: "cyajgdzc"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the video info: ", result.info);
                console.log(result.info.secure_url);
            }
        }
    );
    const uploadClick = () => {
        myWidget.open()
    }
    return (
        <div>
            <Col sm={5}>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Col>
            <button id="upload_widget" onClick={uploadClick} className="cloudinary-button">
                Upload
            </button>
        </div>
    );
}

export default CloudinaryUploadWidget;
