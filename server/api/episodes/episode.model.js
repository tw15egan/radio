import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EpisodeSchema = new Schema({
  name: String,
  description: String,
  timeStart: {
    type: Date,
    default: Date.now,
  },
  timeEnd: {
    type: Date,
    default: Date.now,
  },
  tracklist: [{
    type: Schema.Types.ObjectId,
    ref: 'Track',
  }],
  gifList: Array,
});

const Episode = mongoose.model('Episode', EpisodeSchema);

export default Episode;
