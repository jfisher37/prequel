import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_VIDEO = gql`
  mutation addVideo($title: String!, $cloudURL: String!) {
    addVideo(title: $title, cloudURL: $cloudURL) {
      _id
      title
      cloudURL
      publishDate
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const VIDEO_METRICS = gql`
  mutation videoMetrics($videoId: String, $likes: Int, $dislikes: Int, $views: Int) {
    videoMetrics(videoId: $videoId, likes: $likes, dislikes: $dislikes, views: $views) {
      likes
      dislikes
      views
    }
  }
`;

export default ADD_VIDEO;
