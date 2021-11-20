import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { VIDEO_METRICS } from "../utils/mutations";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const SingleVideo = () => {
  const { videoId } = useParams();
  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS);
  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });
  console.log(data);
  const [like, setLike] = useState(data?.video.likes);
  const [dislike, setDisLike] = useState(data?.video.dislikes);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const video = data?.video || {};
    const viewLimit = video.views + 2;
    const updateMetrics = async () => {
      const newView = video.views + 1;
      try {
        await videoMetrics({
          variables: {
            videoId: videoId,
            likes: like,
            dislikes: dislike,
            views: newView,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (viewLimit > video.views) {
      updateMetrics();
    }
    console.log(video);
    return (
      <div>
        <Container>
          <Card className="text-center my-3">
            <Card.Header as="h2">{video.title}</Card.Header>
            <Card.Body>
              <Card.Title>Posted on: {video.publishDate}</Card.Title>
              <Card.Title>Views: {video.views}</Card.Title>
              <video style={{ width: 660, height: "auto" }} controls>
                <source src={video.cloudURL} type="video/mp4" />
              </video>
              <p>Likes: {video.likes} Dislikes: {video.dislikes}</p>
              <p><button onClick={() => { updateMetrics(setLike(data?.video.likes + 1)) }}><i class="fas fa-thumbs-up"></i></button>
                <button onClick={() => { updateMetrics(setDisLike(data?.video.dislikes + 1)) }}><i class="fas fa-thumbs-down"></i></button></p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
};

export default SingleVideo;
