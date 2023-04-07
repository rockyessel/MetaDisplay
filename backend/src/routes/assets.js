const express = require('express');
const { AssetPost, AssetDelete } = require('../controllers/assets.js');
const { asset_upload } = require('../utils');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.post('/', asset_upload.single('file'), protect, AssetPost);
router.delete('/delete/:assetName', AssetDelete);

module.exports = router;
