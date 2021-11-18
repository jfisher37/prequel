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
  console.log(videos);

  return (
    <div>
      {videos &&
        videos.map((video) => (
          <div>
            <h2>{video.title}</h2>
            <h3>{video.publishDate}</h3>
            <div>Posted by: {video.videoAuthor}</div>
            <Link to={`/videos/${video._id}`}>
              <video style={{ width: 660, height: "auto" }}>
                <source src={video.cloudURL} type="video/mp4" />
              </video>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default VideoList;
