import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import CloudinaryUploadWidget from "../components/Upload";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import VideoList from '../components/VideoList';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { QUERY_VIDEOS } from "../utils/queries";

import VideoList from "../components/VideoList";

const Home = () => {
  const { loading, data } = useQuery(QUERY_VIDEOS);
  const videos = data?.videos || [];

  return (
    <Container>
      <Row>
        <Col>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <VideoList videos={videos} title="HEADER TEXT" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
