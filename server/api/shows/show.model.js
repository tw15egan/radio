import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ShowSchema = new Schema({
  name: String,
  owners: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  description: String,
  timeStart: {
    type: Date,
    default: Date.now,
  },
  timeEnd: {
    type: Date,
    default: Date.now,
  },
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: 'Episode',
  }],
});

const Show = mongoose.model('Show', ShowSchema);

export default Show;
