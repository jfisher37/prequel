import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";

// import Video from '../components/VideoList';

import Auth from "../utils/auth";
import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { REMOVE_VIDEO } from "../utils/mutations";

import Card from "react-bootstrap/Card";

const VideoCrud = () => {
    const { videoId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
        variables: { videoId: videoId },
    });

    const [deleteVideo, { error }] = useMutation(REMOVE_VIDEO);

    const video = data?.video || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    
    

    async function deleteFunction(videoId) {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            const {data} = await deleteVideo({
                variables : {videoId}
            })
        } catch (err) {
            console.log(err)
        }

    }

    const deleteClick = () => {
        deleteFunction(videoId)
    }
  

  return (
    <Container>
      <Card className="text-center my-3">
        <Card.Header as="h2">{video.title}</Card.Header>
        <Card.Body>
          <Card.Title>{video.publishDate}</Card.Title>
          <video style={{ width: 660, height: "auto" }} controls>
            <source src={video.cloudURL} type="video/mp4" />
          </video>
        </Card.Body>
        <div>
          <Button
            className="mb-3"
            variant="primary"
            type="submit"
            onClick={deleteClick}
          >
            Delete
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default VideoCrud;