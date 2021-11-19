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
      return await Video.find();
    },

    // Query for one video
    video: async (parent, { videoId }) => {
      return await Video.findById({ _id: videoId });
    },

    myVideos: async (parent, { videoAuthor }) => {
      return await Video.find({videoAuthor: videoAuthor});
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
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  // Query: {
  //   profiles: async () => {
  //     return Profile.find();
  //   },

  Mutation: {
    // Mutation to add a video
    addVideo: async (parent, { title, cloudURL, videoAuthor }) => {
      const video = await Video.create({ title, cloudURL, videoAuthor });
      return video;
    },

    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
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
      return { token, user };
    },

    videoMetrics: async (parent, {videoId, likes, dislikes, views}) => {
      const video = await Video.findOneAndUpdate(
              { _id: videoId },
              {
                likes: likes,
                dislikes: dislikes,
                views: views
              },
              {
                new: true,
              }
            );
      return video;
    },
    
    removeVideo: async (parent, { videoId }, context) => {
      if (context.user) {
        const video = await Video.findOneAndDelete({
          _id: videoId,
        });

        return video;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Mutation for user to remove their own profile
    // removeProfile: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

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
