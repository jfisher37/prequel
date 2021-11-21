import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { VIDEO_METRICS, UPDATE_LIKES, UPDATE_DISLIKES } from "../utils/mutations";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const SingleVideo = () => {
  const { videoId } = useParams();
  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS);
  const [updateLikes, { err }] = useMutation(UPDATE_LIKES);
  const [updateDislikes, { erro }] = useMutation(UPDATE_DISLIKES);
  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const video = data?.video || {};

    const updateMetrics = () => {
      const newView = (video.views + 1);
      try {
        videoMetrics({
          variables: {
            videoId: videoId,
            views: newView,
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    const isLiked = () => {
      const newLikes = (video.likes + 1)
      updateLikes({
        variables: {
          videoId: videoId,
          likes: newLikes,
        }
      });
    }

    const isDisliked = () => {
      const newDislikes = (video.dislikes + 1)
      updateDislikes({
        variables: {
          videoId: videoId,
          dislikes: newDislikes,
        }
      });
    }

    updateMetrics();

    return (
      <div>
        <Container>
          <Card className="text-center my-3">
            <Card.Header as="h2">{video.title}</Card.Header>
            <Card.Body>
              <Card.Title>{video.publishDate}</Card.Title>
              <Card.Title>Views: {video.views}</Card.Title>
              <video style={{ width: 660, height: "auto" }} controls>
                <source src={video.cloudURL} type="video/mp4" />
              </video>
              <p>Likes: {video.likes} Dislikes: {video.dislikes}</p>
              <p><button onClick={isLiked}><i class="fas fa-thumbs-up"></i></button>
                <button onClick={isDisliked}><i class="fas fa-thumbs-down"></i></button></p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
};

export default SingleVideo;

// const [videoMetrics, { error }] = useMutation(UPDATE_LIKES, {
//   update(cache, { data: { videoMetrics } }) {
//     try {
//       const { banana } = cache.readQuery({ query: QUERY_SINGLE_VIDEO });
//       console.log(banana);
//       cache.writeQuery({
//         query: QUERY_SINGLE_VIDEO,
//         data: { banana: [...banana, videoMetrics] }
//       })

//     } catch (e) {
//       console.error(e);
//     }
//   }
// });