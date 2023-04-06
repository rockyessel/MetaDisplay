const express = require('express');
const { UserPost, UserDelete } = require('../controllers/users.js');
const { asset_upload } = require('../utils');

const router = express.Router();

router.post('/', asset_upload.single('file'), UserPost);
router.delete('/delete/:username', UserDelete);

module.exports = router;
