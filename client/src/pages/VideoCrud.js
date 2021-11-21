import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Auth from "../utils/auth";
import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { REMOVE_VIDEO } from "../utils/mutations";
import Card from "react-bootstrap/Card";

const VideoCrud = () => {
  const { videoId } = useParams();
  // Queries singe video based on params video id
  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });
  // Delete video mutation
  const [deleteVideo, { error }] = useMutation(REMOVE_VIDEO);
  const video = data?.video || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  // Function to delete video
  async function deleteFunction(videoId) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { // if not logged in, user can't delete video
      return false;
    }
    try {
      const { data } = await deleteVideo({
        variables: { videoId }
      })
    } catch (err) {
      console.log(err)
    }
    if (!token) {
      return false;
    }
  }
  // On click, video is deleted and user is taken back to the home page
  const deleteClick = () => {
    deleteFunction(videoId);
    window.location.assign('/');
  };

  return (
    <Container>
      <Card className="text-center my-3">
        <Card.Header as="h2" className="video-title">
          {video.title}
        </Card.Header>
        <Card.Body className="video-body">
          <Card.Title className="roboto-font"> <i className="fas fa-calendar-alt"></i> {video.publishDate}</Card.Title>
          <video style={{ width: 660, height: "auto" }} controls>
            <source src={video.cloudURL} type="video/mp4" />
          </video>
          <h2 className="roboto-font">Are you sure you want to delete your video? This action cannot be undone</h2>
          <div>
            <button
              className="mb-3 button6"
              type="submit"
              onClick={deleteClick}
            >
              Delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VideoCrud;
