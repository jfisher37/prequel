const { Schema, model } = require("mongoose");

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
  },
  dislikes: {
    type: Number,
  },
  views: {
    type: Number,
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  url: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
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
