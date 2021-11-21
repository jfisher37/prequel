const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    level: Int
  }

  type Video {
    _id: ID
    title: String!
    cloudURL: String!
    likes: Int
    dislikes: Int
    views: Int
    publishDate: String
    videoAuthor: String!
    likedBy: [String]
    dislikedBy: [String]
    genres: [Genre]
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
   video(videoId: ID!): Video
   myVideos(videoAuthor: String!): [Video]
   users: [User]
   user(_id: ID!): User
   genres: [Genre]
   genre(_id: ID!): Genre
   me: User
  }

  type Mutation {
    addVideo(title: String!, cloudURL: String!, videoAuthor: String!): Video
    addUser(name: String!, email: String!, password: String!, level: Int): Auth
    login(email: String!, password: String!): Auth
    videoMetrics(videoId: String, views: Int): Video
    updateLikes(videoId: String, user: String): Video
    updateDislikes(videoId: String, user: String): Video
    removeVideo(videoId: ID!): Video
  }
`;

module.exports = typeDefs;
