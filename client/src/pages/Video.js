import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { VIDEO_METRICS } from "../utils/mutations";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const SingleVideo = () => {


  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS, {
    update(cache, { data: { videoMetrics } }) {
      try {
        const { banana } = cache.readQuery({ query: QUERY_SINGLE_VIDEO });
        console.log(banana);
        cache.writeQuery({
          query: QUERY_SINGLE_VIDEO,
          data: { banana: [...banana, videoMetrics] }
        })

      } catch (e) {
        console.error(e);
      }
    }
  });


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
            <p><button onClick={updateMetrics}><i class="fas fa-thumbs-up"></i></button>
              <button onClick={updateMetrics}><i class="fas fa-thumbs-down"></i></button></p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}


export default SingleVideo;
