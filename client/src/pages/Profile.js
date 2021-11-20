import React from "react";
import { useQuery } from "@apollo/client";
import { Link, Redirect, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Auth from "../utils/auth";
import { QUERY_MY_VIDEOS } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_MY_VIDEOS, {
    variables: { videoAuthor: Auth.getProfile().data.name },
  });

  const videos = data?.myVideos || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {videos.map((video) => (
        <Container>
          <Card className="text-center my-3">
            <Card.Header as="h2" className="video-title">
              {video.title}
            </Card.Header>
            <Card.Body className="video-body">
              <Card.Title className="roboto-font">
                {video.publishDate}
              </Card.Title>
              <div className="roboto-font">Posted by: {video.videoAuthor}</div>
              <Link to={`/videos/${video._id}`}>
                <video style={{ width: 660, height: "auto" }}>
                  <source src={video.cloudURL} type="video/mp4" />
                </video>
              </Link>
              <div>
                <Link to={`/videosCrud/${video._id}`}>Click for Delete</Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      ))}
    </div>
  );
};

export default Profile;
