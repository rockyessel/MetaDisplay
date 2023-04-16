const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema(
  {
    views: {
      type: Number,
      default: 0,
    },
    asset_url: {
      type: String,
    },
    saves: {
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

const Asset = mongoose.model('Asset', AssetSchema);
module.exports = Asset;
