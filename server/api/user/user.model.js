import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'listener',
  },
  meta: {
    twitter: {
      type: String,
      default: 'N/A',
    },
    soundcloud: {
      type: String,
      default: 'N/A',
    },
    bio: {
      type: String,
      default: 'N/A',
    },
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
