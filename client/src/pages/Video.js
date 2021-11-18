import React from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_VIDEO } from '../utils/queries';

const SingleVideo = () => {
    const { videoId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
        variables: { videoId: videoId },
    });

    const video = data?.video || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>{video.title}</div>
            <div>{video.publishDate}</div>
            <video style={{ width: 660, height: 'auto' }} controls>
                <source src={video.cloudURL} type="video/mp4" />
            </video>
        </div>
    )
};

export default SingleVideo;
