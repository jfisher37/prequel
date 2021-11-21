const { AuthenticationError } = require("apollo-server-express");
const { User, Video, Genre } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Query for all users
    users: async () => {
      return User.find();
    },

    // Query for one user
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },

    // Query for all videos
    videos: async () => {
      return await Video.find().sort({ publishDate: -1 });
    },

    // Query for one video
    video: async (parent, { videoId }) => {
      return await Video.findById({ _id: videoId });
    },

    myVideos: async (parent, { videoAuthor }) => {
      return await Video.find({ videoAuthor: videoAuthor });
    },

    // Query for all genres
    genres: async () => {
      return await Genre.find();
    },

    // Query for one genre
    genre: async (parent, { _id }) => {
      return await Genre.findById(_id);
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      // console.log(context.body)
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // Mutation to add a video
    addVideo: async (parent, { title, cloudURL, videoAuthor }) => {
      const video = await Video.create({ title, cloudURL, videoAuthor });
      return video;
    },

    // Mutation to sign up
    addUser: async (parent, { name, email, password, level }) => {
      const user = await User.create({ name, email, password, level });
      const token = await signToken(user);
      console.log(token);
      return { user, token };
    },

    // Mutation to login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },

    // Mutation to update views
    videoMetrics: async (parent, { videoId, views }) => {
      const video = await Video.findOneAndUpdate(
        { _id: videoId },
        {
          views: views
        },
        {
          new: true,
        }
      );
      return video;
    },

    // Mutation to update likes
    updateLikes: async (parent, {videoId, user}) => {
      const video = await Video.findOneAndUpdate(
              { _id: videoId },
              {
                $inc: { likes: 1 },
                $push: { likedBy: user },
              },
              {
                new: true,
              }
            );
      return video;
    },

    updateDislikes: async (parent, {videoId, user}) => {
      const video = await Video.findOneAndUpdate(
              { _id: videoId },
              {
                $inc: { dislikes: 1 },
                $push: { dislikedBy: user },
              },
              {
                new: true,
              }
            );
    
      return video;
    },

    // Mutation to delete a video
    removeVideo: async (parent, { videoId }, context) => {
      if (context.user) {
        const video = await Video.findOneAndDelete({
          _id: videoId,
        });

        return video;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
