const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Video {
    _id: ID
    title: String!
    likes: Int
    dislikes: Int
    views: Int
    publishedDate: String
    video: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    videos: [Video]
  }

  type Mutation {
    uploadVideo(video: String!): Video
  }
`;

module.exports = typeDefs;
