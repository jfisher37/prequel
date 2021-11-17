const { AuthenticationError } = require('apollo-server-express');
const { User, Video, Genre } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require("cloudinary");

const resolvers = {
  Query: {
    videos: async () => {
      return await Video.find()
    }
  },
  Mutation: {
    uploadVideo: async (parent, { video }) => {
      //initialize cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      try {
        const result = await cloudinary.v2.uploader.upload(video, {
          //here i chose to allow only jpg and png upload
          allowed_formats: ["jpg", "png"],
          //generates a new id for each uploaded image
          public_id: "",
          /*creates a folder called "your_folder_name" where images will be stored.
          */
          folder: "your_folder_name",
        });
      } catch (e) {
        //returns an error message on image upload failure.
        return `Image could not be uploaded:${e.message}`;
      }
      /*returns uploaded photo url if successful `result.url`.
      if we were going to store image name in database,this
      */
      return `Successful-Photo URL: ${result.url}`;
    },
  },
  // Query: {
  //   profiles: async () => {
  //     return Profile.find();
  //   },

  //   profile: async (parent, { profileId }) => {
  //     return Profile.findOne({ _id: profileId });
  //   },
  //   // By adding context to our query, we can retrieve the logged in user without specifically searching for them
  //   me: async (parent, args, context) => {
  //     if (context.user) {
  //       return Profile.findOne({ _id: context.user._id });
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  // },

  // Mutation: {
  //   addProfile: async (parent, { name, email, password }) => {
  //     const profile = await Profile.create({ name, email, password });
  //     const token = signToken(profile);

  //     return { token, profile };
  //   },
  //   login: async (parent, { email, password }) => {
  //     const profile = await Profile.findOne({ email });

  //     if (!profile) {
  //       throw new AuthenticationError('No profile with this email found!');
  //     }

  //     const correctPw = await profile.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect password!');
  //     }

  //     const token = signToken(profile);
  //     return { token, profile };
  //   },

  //   // Add a third argument to the resolver to access data in our `context`
  //   addSkill: async (parent, { profileId, skill }, context) => {
  //     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
  //     if (context.user) {
  //       return Profile.findOneAndUpdate(
  //         { _id: profileId },
  //         {
  //           $addToSet: { skills: skill },
  //         },
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );
  //     }
  //     // If user attempts to execute this mutation and isn't logged in, throw an error
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   // Set up mutation so a logged in user can only remove their profile and no one else's
  //   removeProfile: async (parent, args, context) => {
  //     if (context.user) {
  //       return Profile.findOneAndDelete({ _id: context.user._id });
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   // Make it so a logged in user can only remove a skill from their own profile
  //   removeSkill: async (parent, { skill }, context) => {
  //     if (context.user) {
  //       return Profile.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { skills: skill } },
  //         { new: true }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  // },
};

module.exports = resolvers;
