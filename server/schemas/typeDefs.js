const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
  }

  type Video {
    _id: ID
    title: String!
    likes: Int
    dislikes: Int
    views: Int
    publishedDate: String
    url: String!
  }

  type Genre {
    name: String!
    videos: [Video]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
   videos: [Video]!
   video: Video
  }
`;

module.exports = typeDefs;
