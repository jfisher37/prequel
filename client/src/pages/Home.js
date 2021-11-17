import React from "react";
import { useQuery } from "@apollo/client";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

// import VideoList from '../components/VideoList';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { QUERY_VIDEOS } from "../utils/queries";

import VideoList from "../components/VideoList";

const Home = () => {
  const { loading, data } = useQuery(QUERY_VIDEOS);
  const videos = data?.videos || [];

  return (
    <main>
      <p>Hi</p>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <CloudinaryUploadWidget />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <VideoList videos={videos} title="HEADER TEXT" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
