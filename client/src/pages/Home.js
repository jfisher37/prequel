import React from 'react';
import { useQuery } from '@apollo/client';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';

// import VideoList from '../components/VideoList';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { QUERY_VIDEOS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_VIDEOS);
  const videos = data?.videos || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
        <CloudinaryUploadWidget />
          
        </div>
      </div>
    </main>
  );
};

export default Home;
