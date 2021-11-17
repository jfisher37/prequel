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
    default: Date.now(),
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
