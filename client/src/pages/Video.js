import React, { useState, useEffect } from "react";

// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { VIDEO_METRICS } from "../utils/mutations";

const SingleVideo = () => {
  const { videoId } = useParams();

  console.log(videoId);

  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });
  console.log(data);
  const video = data?.video || {};
  console.log(video.views);
  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { videoMetrics } }) {
      try {
        // First we retrieve existing profile data that is stored in the cache under the `QUERY_PROFILES` query
        // Could potentially not exist yet, so wrap in a try/catch
        const { views } = cache.readQuery({ query: QUERY_SINGLE_VIDEO });

        // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_SINGLE_VIDEO,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { views },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });


  // console.log(views)

  const updateMetrics = async (e) => {
    e.preventDefault(); 

const newView =  video.views + 1;
console.log (newView)

  try {
    await videoMetrics({
      variables: {
        videoId: videoId,
        likes: 0,
        dislikes: 0,
        views: newView,
      },
    });
    // window.location.reload();
} catch(err){console.log(err)}
  };

//   if (views > video.views){
//    updateMetrics();
//   }
  // console.log(video.views)

  if (loading) {
    return <div>Loading...</div>;
  }

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
};

export default SingleVideo;
