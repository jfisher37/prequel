import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

// import Video from '../components/VideoList';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import { QUERY_SINGLE_VIDEO } from '../utils/queries';
import { REMOVE_VIDEO } from '../utils/mutations';

const VideoCrud = () => {
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

export default VideoCrud;