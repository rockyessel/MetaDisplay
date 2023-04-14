const express = require('express');
const {
  AssetPost,
  AssetDelete,
  GetAsset,
  IncreaseAssetViewCount,
  AssetSave,
} = require('../controllers/assets.js');
const { asset_upload } = require('../utils');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.post('/', asset_upload.single('file'), protect, AssetPost);
router.delete('/delete/:assetName', AssetDelete);
router.get('/:assetId', GetAsset);
router.put('/views', IncreaseAssetViewCount);
router.put('/saves',protect, AssetSave);

module.exports = router;
