const mongoose = require('mongoose');
const { Schema } = mongoose;
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

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
