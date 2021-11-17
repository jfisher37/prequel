import { gql } from '@apollo/client';

export const QUERY_VIDEOS = gql`
  query allVideos {
    videos {
      _id
      title
      cloudURL
    }
  }
`
export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
     
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      
    }
  }
`;


// query findUsers {
//   users{
//     email
//     password
//     name
//   }
// }

// query findVids {
//   videos{
//     _id
//     title
//     cloudURL
//   }
// }

// query findVid ($id: ID!){
//   video(_id: $id){
//     title
//     cloudURL
//   }
// }

// mutation login($email: String!, $password: String!){
//   login(email: $email, password: $password){
//     token
//     user{
//       name
//     }
//   }
// }
