const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      unique: true,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model('Asset', AssetSchema);
module.exports = Asset;
