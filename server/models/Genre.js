const { Schema, model } = require("mongoose");

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const Genre = model("Genre", genreSchema);

module.exports = Genre;
