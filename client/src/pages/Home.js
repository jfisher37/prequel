import React from "react";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { QUERY_VIDEOS } from "../utils/queries";
import VideoList from "../components/VideoList";
// Home page
const Home = () => {
  // Queries videos
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
