import React from 'react';
import { useQuery } from '@apollo/client';

import Video from '../components/VideoList';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_VIDEO);
  const video = data?.video || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Video
              video={video}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
