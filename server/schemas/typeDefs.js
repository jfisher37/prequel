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
    likes: int
    dislikes: int
    views: int
    publishedDate: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
   videos: [Video]
  }

  type Mutation {
   
  }
`;

module.exports = typeDefs;
