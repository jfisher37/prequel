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
      {videos.map((video) => (
        <div>
          <div>{video.title}</div>
          <div>{video.publishDate}</div>
          <video style={{ width: 660, height: 'auto' }} controls>
            <source src={video.cloudURL} type="video/mp4" />
          </video>
          <Link to={`/videos/${video._id}`}>Click to see in a new tab.</Link>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
