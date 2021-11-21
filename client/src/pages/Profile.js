import React from "react";
import { useQuery } from "@apollo/client";
import { Link, Redirect, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Auth from "../utils/auth";
import { QUERY_MY_VIDEOS } from "../utils/queries";
// Profile page for user to see only their videos
const Profile = () => {
  // Queries user who is logged in videos
  const { loading, data } = useQuery(QUERY_MY_VIDEOS, {
    variables: { videoAuthor: Auth.getProfile().data.name },
  });

  const videos = data?.myVideos || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="roboto-font2 video-title">{Auth.getProfile().data.name}'s Videos</h1>
      {videos.map((video) => (
        <Container>
          <Card className="text-center my-3">
            <Card.Header as="h2" className="video-title">
              {video.title}
            </Card.Header>
            <Card.Body className="video-body">
              <Card.Title className="roboto-font">
                <i className="fas fa-calendar-alt"></i> {video.publishDate}
              </Card.Title>
              <Link to={`/videos/${video._id}`}>
                <video style={{ width: 660, height: "auto" }}>
                  <source src={video.cloudURL} type="video/mp4" />
                </video>
              </Link>
              <div className="roboto-font"><i className="fas fa-user"></i>  {Auth.getProfile().data.name}</div>
              <div>
                <Link className="delete-trash" to={`/videosCrud/${video._id}`}><i className="fas fa-trash"></i></Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      ))}
    </div>
  );
};

export default Profile;
