const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    address: {
      type: mongoose.Schema.Types.Mixed,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: [
        {
          type: String,
          ref: 'User',
        },
      ],
      default: [],
      sparse: true,
    },
    following: {
      type: [
        {
          type: String,
          ref: 'User',
        },
      ],
      default: [],
      sparse: true,
    },
    savedAssets: {
      type: [String],
      ref: 'Asset',
      default: [],
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('User', UserSchema);
module.exports = User;
