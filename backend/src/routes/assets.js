const express = require('express');
const { AssetPost } = require('../controllers/assets.js');
const { asset_upload } = require('../utils');

const router = express.Router();

router.post('/', asset_upload.single('file'), AssetPost);

module.exports = router;
