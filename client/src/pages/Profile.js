import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Auth from '../utils/auth';
import { QUERY_MY_VIDEOS } from '../utils/queries';


const Profile = () => {
  

  
  const {loading, data }= useQuery(QUERY_MY_VIDEOS, {
    variables: {videoAuthor: Auth.getProfile().data.name}
  }
  );
  
  const videos = data?.myVideos || [];

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
         <div>Posted by: {Auth.getProfile().data.name}</div>
         <Link to={`/videos/${video._id}`}>
           <video style={{ width: 660, height: "auto" }}>
             <source src={video.cloudURL} type="video/mp4" />
           </video>
         </Link>
         <div><Link to={`/videosCrud/${video._id}`}>Click here to delete</Link></div>
       </Card.Body>
     </Card>
    )
    )}
  </div>
)

}

export default Profile;

