const db = require('../config/connection');
const { User, Video, Genre } = require('../models');
const userSeeds = require('./userSeeds.json');
const videoSeeds = require('./videoSeeds.json');
const genreSeeds = require('./genreSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Video.deleteMany({});
    await Video.create(videoSeeds);
    await Genre.deleteMany({});
    await Genre.create(genreSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
