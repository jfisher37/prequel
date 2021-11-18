import React from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_VIDEO } from '../utils/queries';

const SingleVideo = () => {
    const { videoId } = useParams();

    console.log(videoId);

    const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
        variables: { videoId: videoId },
    });
    console.log(data);
    const video = data?.video || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>Hi
            <p>{video.title}</p>
        </div>
    )
};

export default SingleVideo;
