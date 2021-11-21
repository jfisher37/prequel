const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  cloudURL: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  publishDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  videoAuthor: {
    type: String,
    required: true,
    trim: true,
  },

  likedBy: [
    {
      type: String
    },
  ],

  dislikedBy: [
    {
      type: String
    },
  ],

  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
});

const Video = model("Video", videoSchema);

module.exports = Video;
