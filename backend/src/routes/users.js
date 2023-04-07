const express = require('express');
const { RegisterUser, UserDelete } = require('../controllers/users.js');
const { asset_upload } = require('../utils');

const router = express.Router();

router.post('/register', asset_upload.single('file'), RegisterUser);
router.delete('/delete/:username', UserDelete);

module.exports = router;
