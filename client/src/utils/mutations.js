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

export const REMOVE_VIDEO = gql`
  mutation removeVideo($videoId: ID!) {
    video(videoId: $videoId) {
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

export default ADD_VIDEO;
