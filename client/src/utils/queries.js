import { gql } from "@apollo/client";

export const QUERY_VIDEOS = gql`
  query allVids {
    videos {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
      videoAuthor
    }
  }
`;

export const QUERY_SINGLE_VIDEO = gql`
  query singleVid($videoId: ID!) {
    video(videoId: $videoId) {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
      likedBy
      dislikedBy
    }
  }
`;

export const QUERY_MY_VIDEOS = gql`
  query myVids($videoAuthor: String!) {
    myVideos(videoAuthor: $videoAuthor) {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
    }
  }
`

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
      level
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(_id: $id) {
      name
      email
      level
    }
  }
`;

export const QUERY_GENRES = gql`
  query allGenres {
    genres {
      name
      videos
    }
  }
`;

export const QUERY_SINGLE_GENRE = gql`
  query singleGenre($id: ID!) {
    genre(_id: $id) {
      name
      videos
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      level
    }
  }
`;
