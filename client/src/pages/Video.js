import React from "react";

// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_VIDEO } from "../utils/queries";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const SingleVideo = () => {
  const { videoId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });

  const video = data?.video || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card className="text-center">
        <Card.Header as="h2">{video.title}</Card.Header>
        <Card.Body>
          <Card.Title>{video.publishDate}</Card.Title>
          <video style={{ width: 660, height: "auto" }} controls>
            <source src={video.cloudURL} type="video/mp4" />
          </video>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleVideo;
