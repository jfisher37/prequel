import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { useMutation } from "@apollo/client";

import { VIDEO_METRICS } from "../../utils/mutations";



// A page of all the videos, passed into the Home.js file

// Need a list of all videos in the DB

// Probably in some kind of array to be mapped over

// Return brings back all videos from the DB

const VideoList = ({ videos }) => {
  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS);

  if (!videos.length) {
    return <h3 className="roboto-font2">No Videos Yet!</h3>;
  }
  console.log(videos);




  const updateMetrics = async (videoId, videoViews) => {
    const newView = (videoViews + .5);
    console.log(newView);

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
              <Card.Title className="roboto-font"><i class="fas fa-calendar-alt"></i>  {video.publishDate}</Card.Title>

              <Link to={`/videos/${video._id}`}>
                <video playsinline style={{ width: 660, height: "auto" }} onClick={updateMetrics(video._id, video.views)}>
                  <source src={video.cloudURL} type="video/mp4" />
                </video>
              </Link>
              <div className="roboto-font"><i class="fas fa-user"></i>  {video.videoAuthor}</div>

            </Card.Body >
          </Card >
        ))
      }
    </div >
  );
};

export default VideoList;
