import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

// import Video from '../components/VideoList';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import Auth from '../utils/auth'
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

    // const [deleteVideo, { error }] = useMutation(REMOVE_VIDEO);
    

    async function deleteFunction(videoId) {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        // try {
        //     const {data} = await deleteVideo({
        //         variables : {videoId}
        //     })
        // } catch (err) {
        //     console.log(err)
        // }

    }

    return (
        <div>
            <div>{video.title}</div>
            <div>{video.publishDate}</div>
            <video style={{ width: 660, height: 'auto' }} controls>
                <source src={video.cloudURL} type="video/mp4" />
            </video>
            <div><Button variant="primary" type="submit" onClick={deleteFunction}>Delete</Button></div>
        </div>
    )

};

export default VideoCrud;