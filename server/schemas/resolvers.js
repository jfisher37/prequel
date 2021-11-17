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
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    // Query for all videos
    videos: async () => {
      return Video.find();
    },

    // Query for one video
    video: async (parent, { videoId }) => {
      return Video.findOne({ _id: videoId });
    },

    // Query for all genres
    genres: async () => {
      return Genre.find();
    },

    // Query for one genre
    genre: async (parent, { genreId }) => {
      return Genre.findOne({ _id: genreId });
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  // Query: {
  //   profiles: async () => {
  //     return Profile.find();
  //   },

  Mutation: {
    // Mutation to add a user
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, profile };
    },

    // Mutation to login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, profile };
    },

    // Mutation for user to remove their own profile
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Add a third argument to the resolver to access data in our `context`
    // addSkill: async (parent, { profileId, skill }, context) => {
    //   // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    //   if (context.user) {
    //     return Profile.findOneAndUpdate(
    //       { _id: profileId },
    //       {
    //         $addToSet: { skills: skill },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   // If user attempts to execute this mutation and isn't logged in, throw an error
    //   throw new AuthenticationError("You need to be logged in!");
    // },

    // Make it so a logged in user can only remove a skill from their own profile
    // removeSkill: async (parent, { skill }, context) => {
    //   if (context.user) {
    //     return Profile.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { skills: skill } },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
