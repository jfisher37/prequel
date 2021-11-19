import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { VIDEO_METRICS } from "../utils/mutations";

const SingleVideo = () => {
  const { videoId } = useParams();
  console.log ("HI")

  console.log(videoId);

  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS);

  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });

  if (loading) {
    return <div>Loading...</div>;
  } else {


  console.log(data);
  const video = data?.video || {};
  console.log(video.views);

  const viewLimit = video.views + 2;

  const updateMetrics = async () => {
  console.log(video.views);
  const newView = video.views + 1;
  console.log(newView);

    try {
      await videoMetrics({
        variables: {
          videoId: videoId,
          likes: 0,
          dislikes: 0,
          views: newView,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

    if (viewLimit > video.views){
     updateMetrics();
    }
  console.log(video.views)



  return (
    <div>
      <div>{video.title}</div>
      <div>{video.publishDate}</div>
      <p>{video.views}</p> 
      <video style={{ width: 660, height: "auto" }} controls>
        <source src={video.cloudURL} type="video/mp4" />
      </video>
      <button onClick={updateMetrics}>+view</button>
    </div>
  );
}};

export default SingleVideo;
