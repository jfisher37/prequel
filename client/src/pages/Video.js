import React from "react";
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
          likes: 0,
          dislikes: 0,
          views: newView,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

    if (viewLimit > video.views){
     updateMetrics();
    }



  return (
    <div>
    <Container>
      <Card className="text-center my-3">
        <Card.Header as="h2" className="video-title">{video.title}</Card.Header>
        <Card.Body>
          <Card.Title className="roboto-font">{video.publishDate}</Card.Title>
          <Card.Title className="roboto-font">Views: {video.views}</Card.Title>
          <video style={{ width: 660, height: "auto" }} controls>
            <source src={video.cloudURL} type="video/mp4" />
          </video>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}};

export default SingleVideo;
