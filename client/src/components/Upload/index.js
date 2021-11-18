import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useMutation } from "@apollo/client";
import ADD_VIDEO from "../../utils/mutations";
import Button from 'react-bootstrap/Button';

function CloudinaryUploadWidget() {
    const [title, setTitle] = useState("")
    const [URL, setURL] = useState("")
    const [addVideo, { error }] = useMutation(ADD_VIDEO);

    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dq3jfvis9",
            uploadPreset: "cyajgdzc",
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                setURL(result.info.secure_url);
            }

        }
    );

    const uploadClick = () => {
        myWidget.open();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(title);
        try {
            console.log(`${title} ${URL}`)
            addVideo({
                variables: {
                    title: title,
                    cloudURL: URL,
                }
            });
        } catch (err) {
            console.error(err);
        }

    }
    return (
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
                        <Form.Control onChange={(event) => {
                            setTitle(event.target.value)
                        }} />
                    </Form.Group>
                </Col>
                <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CloudinaryUploadWidget;
