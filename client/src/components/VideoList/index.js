import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useMutation } from "@apollo/client";
import { VIDEO_METRICS } from "../../utils/mutations";
// Videos appearing on home page
const VideoList = ({ videos }) => {
  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS);
  // If there are no videos, "No Videos Yet!" message appears
  if (!videos.length) {
    return <h3 className="roboto-font2">No Videos Yet!</h3>;
  }
  // Updates video views on page reload
  const updateMetrics = async (videoId, videoViews) => {
    const newView = (videoViews + .5); // Add .5 because added 2 views when page reloaded
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

  return (
    <div>
      {videos &&
        videos.map((video) => (
          <Card className="text-center my-3" key={video._id}>
            <Card.Header as="h2" className="video-title">{video.title}</Card.Header>
            <Card.Body className="video-body">
              <Card.Title className="roboto-font"><i className="fas fa-calendar-alt"></i>  {video.publishDate}</Card.Title>
              <Link to={`/videos/${video._id}`}>
                <video playsInline style={{ width: 660, height: "auto" }} onClick={updateMetrics(video._id, video.views)}>
                  <source src={video.cloudURL} type="video/mp4" />
                </video>
              </Link>
              <div className="roboto-font"><i className="fas fa-user"></i>  {video.videoAuthor}</div>
            </Card.Body >
          </Card >
        ))
      }
    </div >
  );
};

export default VideoList;
