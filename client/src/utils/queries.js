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
    }
  }
`;

export const QUERY_SINGLE_VIDEO = gql`
  query singleVid($videoId: ID!) {
<<<<<<< HEAD
    video(_id: $videoId) {
=======
    video(videoId: $videoId) {
>>>>>>> 351583ea307e6e9776b180f3d9109f25b752ca4f
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(_id: $id) {
      name
      email
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

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       name
//     }
//   }
// `;


