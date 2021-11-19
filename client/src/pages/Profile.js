import React from "react";
import { useQuery } from "@apollo/client";
import { Link, Redirect, useParams  } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Auth from '../utils/auth';
import VideoList from "../components/VideoList";
import { QUERY_SINGLE_USER, QUERY_ME, QUERY_MY_VIDEOS } from '../utils/queries';


const Profile = () => {
  

  
  const {loading, data }= useQuery(QUERY_MY_VIDEOS, {
    variables: {videoAuthor: Auth.getProfile().data.name}
  }
  );
  
  console.log(data)
  

  const videos = data?.myVideos || [];

  console.log(videos)

  if (loading) {
    return <div>Loading...</div>;
}

return (
  <div>
    {videos.map((video) => (
       <Card className="text-center my-3">
       <Card.Header as="h2">{video.title}</Card.Header>
       <Card.Body>
         <Card.Title>{video.publishDate}</Card.Title>
         <div>Posted by: {video.videoAuthor}</div>
         <Link to={`/videos/${video._id}`}>
           <video style={{ width: 660, height: "auto" }}>
             <source src={video.cloudURL} type="video/mp4" />
           </video>
         </Link>
         <div><Link to={`/videosCrud/${video._id}`}>Click for CRUD</Link></div>
       </Card.Body>
     </Card>
    )
    )}
  </div>
)

}

export default Profile;

