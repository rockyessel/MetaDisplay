const express = require('express');
const { RegisterUser, LoginUser, UserDelete, FindUserAddress} = require('../controllers/users.js');
const { asset_upload } = require('../utils');

const router = express.Router();

router.post('/register', asset_upload.single('file'), RegisterUser);
router.post('/login', LoginUser);
router.delete('/delete/:address', UserDelete);
router.get('/find/:address', FindUserAddress);

module.exports = router;
