const express = require('express');
const { AssetPost, AssetDelete } = require('../controllers/assets.js');
const { asset_upload } = require('../utils');

const router = express.Router();

router.post('/', asset_upload.single('file'), AssetPost);
router.delete('/delete/:assetName', AssetDelete);

module.exports = router;
