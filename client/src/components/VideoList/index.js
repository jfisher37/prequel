import React from "react";
import { Link } from "react-router-dom";

// A page of all the videos, passed into the Home.js file

// Need a list of all videos in the DB

// Probably in some kind of array to be mapped over

// Return brings back all videos from the DB

const VideoList = ({ videos }) => {
  if (!videos.length) {
    return <h3>No Videos Yet!</h3>;
  }

  return (
    <div>
      {videos.map((videos) => (
        <div>
          <div>{videos.title}</div>
          <div>{videos.cloudURL}</div>
          <video controls>
            <source src={videos.cloudURL} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
